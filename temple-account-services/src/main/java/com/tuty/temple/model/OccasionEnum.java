package com.tuty.temple.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OccasionEnum {

    MSRP("MSRP","Maha Sivarathri Poojai");

    private final String code;
    private final String description;

}
