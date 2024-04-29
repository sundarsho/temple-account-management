package com.tuty.temple.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum OccasionEnum {

    MSRP("MSRP","Maha Sivarathri Poojai"),
    MDP("MDP","Mandala Poojai"),
    VIL("VIL","Vilakku Poojai"),
    VAR("VAR","Varushabisegam"),
    LAK("LAK","Laksharchanai"),
    KUB("KUB","Kumbabisegam"),
    TKP("TKP","Thiru Karthigai Poojai"),
    SP("SP","Special Poojai"),
    RP("RP","Regular Poojai"),
    GEN("GEN","General");

    private final String code;
    private final String description;

}
