package com.example.demo.domain.item;

import com.example.demo.core.generic.AbstractEntity;
import com.example.demo.domain.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "item")
public class Item extends AbstractEntity {

    @NotNull
    private String name;

    @NotNull
    @Column(name = "picture_url")
    private String pictureURL;

    @NotNull
    private String description;

    @NotNull
    private Float price;

    @ManyToOne
    private User user;

}
