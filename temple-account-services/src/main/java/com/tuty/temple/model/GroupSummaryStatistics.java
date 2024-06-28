package com.tuty.temple.model;

import com.tuty.temple.entities.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder(toBuilder = true, builderMethodName = "builder")
public class GroupSummaryStatistics {

    private String fieldName;
    private Object value;
    private Long count;
    private BigDecimal sum;

    public String getDescription() {
        if(("occasionCd").equalsIgnoreCase(this.fieldName)){
            String code = this.value.toString();
            for (OccasionEnum occasion : OccasionEnum.values()) {
                if (occasion.getCode().equalsIgnoreCase(code)) {
                    return occasion.getDescription();
                }
            }
        }else if(("member").equalsIgnoreCase(this.fieldName)){
            Member member = (Member) this.value;
            return member.getMemberId() +"-"+ member.getName() +"-"+ member.getAncestorVillage();
        }else{
            return this.value.toString();
        }
        return this.value.toString();
    }

}
