package com.example.demo.domain.userprofile;

import com.example.demo.domain.userprofile.dto.UserProfileDTO;
import com.example.demo.domain.userprofile.dto.UserProfileMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@Log4j2
@RequestMapping("/userprofile")
public class UserProfileController {

    private final UserProfileService userProfileService;
    private final UserProfileMapper userProfileMapper;

    private static final String LOG_STRING = "User: ";

    @Autowired
    public UserProfileController(UserProfileService userProfileService, UserProfileMapper userProfileMapper) {
        this.userProfileService = userProfileService;
        this.userProfileMapper = userProfileMapper;
    }

    @GetMapping("")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE')")
    public ResponseEntity<List<UserProfileDTO>> getAllUserProfiles(@RequestParam int pageSize,
                                                                   @RequestParam int page,
                                                                   @RequestParam String sortBy,
                                                                   @RequestParam boolean asc){
        log.info(LOG_STRING + SecurityContextHolder.getContext()
                .getAuthentication() + "requested Page: " + page + " Page size: " + pageSize + " Sort by: " + sortBy +
                " Order Ascending: " + asc);
        List<UserProfileDTO> userProfileDTOs = userProfileMapper.toDTOs(userProfileService
                .findAllUserProfiles(page, pageSize, sortBy, asc));
        return new ResponseEntity<>(userProfileDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE')")
    public ResponseEntity<UserProfileDTO> getUserProfileById(@PathVariable UUID id){
        log.info(LOG_STRING + SecurityContextHolder.getContext().getAuthentication() +
                "requested user profile for user id: " + id);
        UserProfile userProfile = userProfileService.findUserProfileById(id);
        return new ResponseEntity<>(userProfileMapper.toDTO(userProfile), HttpStatus.OK);
    }

    @PostMapping("")
    @PreAuthorize("@userPermissionEvaluator.isOwnProfile(authentication.principal.user,#userProfileDTO.user.id)")
    public ResponseEntity<UserProfileDTO> createUserProfile(@RequestBody UserProfileDTO userProfileDTO){
        log.info(LOG_STRING + SecurityContextHolder.getContext().getAuthentication() +
                "requested to create user profile");
        UserProfile userProfile = userProfileService.createUserProfile(userProfileMapper.fromDTO(userProfileDTO));
        return new ResponseEntity<>(userProfileMapper.toDTO(userProfile), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE') or" +
            " @userPermissionEvaluator.isOwnProfile(authentication.principal.user,#id)")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@PathVariable UUID id,
                                                            @RequestBody UserProfileDTO userProfileDTO){
        log.info(LOG_STRING + SecurityContextHolder.getContext().getAuthentication() + "requested to update user profile for user id :" + id);
        UserProfile userProfile = userProfileService.updateUserProfile(id, userProfileMapper.fromDTO(userProfileDTO));
        return new ResponseEntity<>(userProfileMapper.toDTO(userProfile), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('USER_MODIFY') or hasAuthority('USER_DELETE') or " +
            "@userPermissionEvaluator.isOwnProfile(authentication.principal.user,#id)")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable UUID id){
        log.info(LOG_STRING + SecurityContextHolder.getContext().getAuthentication() + "requested to delete user profile for user id :" + id);
        userProfileService.deleteUserProfile(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
