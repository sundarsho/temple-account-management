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

    private String groupBy;
    private Object value;
    private Long count;
    private BigDecimal sum;

    public String getDescription() {
        if(("occasionCd").equalsIgnoreCase(this.groupBy)){
            String code = this.value.toString();
            for (OccasionEnum occasion : OccasionEnum.values()) {
                if (occasion.getCode().equalsIgnoreCase(code)) {
                    return code+"-"+occasion.getDescription();
                }
            }
        }else if(("member").equalsIgnoreCase(this.groupBy)){
            Member member = (Member) this.value;
            return member.getMemberId() +"-"+ member.getName() +"-"+ member.getAncestorVillage();
        }else{
            return this.value.toString();
        }
        return this.value.toString();
    }

}
