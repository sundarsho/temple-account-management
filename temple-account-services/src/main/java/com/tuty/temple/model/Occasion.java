package com.tuty.temple.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Occasion {

    MSP("Maha Sivarathri Poojai");

    private final String description;
    
}
