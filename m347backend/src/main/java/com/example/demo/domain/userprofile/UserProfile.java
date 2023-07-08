package com.example.demo.domain.userprofile;

import com.example.demo.core.generic.AbstractEntity;
import com.example.demo.domain.user.User;
import lombok.*;
import lombok.extern.log4j.Log4j2;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Log4j2
public class UserProfile extends AbstractEntity {

    @NotNull
    @Size(min = 1)
    @NotEmpty
    @NotBlank
    @Column(name = "profile_picture_url")
    private String profilePictureURL;

    @NotNull
    @Column(name = "age")
    private int age;

    @NotNull
    @Size(min = 10, max = 30, message = "min 10, max 10")
    @Column(name = "address")
    private String address;

    @NotNull
    @Column(name = "birth_date")
    private Date birthDate;

    @Column(name = "created_date")
    private Date createdDate;

    @Column(name = "last_modified_date")
    private Date lastModifiedDate;

    @OneToOne
    private User user;
}
