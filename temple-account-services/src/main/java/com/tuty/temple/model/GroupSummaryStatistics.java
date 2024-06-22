package com.tuty.temple.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder(toBuilder = true, builderMethodName = "builder")
public class GroupSummaryStatistics {

    private String fieldName;
    private String value;
    private Long count;
    private BigDecimal sum;
}
