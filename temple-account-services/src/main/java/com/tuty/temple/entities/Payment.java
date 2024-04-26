package com.tuty.temple.entities;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.tuty.temple.model.OccasionEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder(toBuilder = true, builderClassName = "Builder")
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "PAYMENT")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="PAYMENT_ID_SEQ")
    @Column(name="PAYMENT_ID")
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @NotNull
    private Member member;

    @Column(name = "RECEIPT_NO")
    private Long receiptNo;

    @Column(name = "OCCASION_CD")
    private String occasionCd;

    @Transient
    @JsonProperty("occasionDesc")
    public String getOccasionDesc() {
        if (this.occasionCd == null) {
            return null;
        }
        for (OccasionEnum occasion : OccasionEnum.values()) {
            if (occasion.getCode().equalsIgnoreCase(this.occasionCd)) {
                return occasion.getDescription();
            }
        }
        return null;
    }

    @Column(name="PAYMENT_TYPE")
    private String paymentType;

    @Column(name="PAYMENT_AMOUNT")
    private BigDecimal paymentAmount;

    @Column(name="FINANCIAL_YEAR")
    private String financialYear;

    @Column(name="PAYMENT_DATE")
    private LocalDate paymentDate;

    @Column(name="PAYMENT_MODE")
    private String paymentMode;

    @Column(name="CREATED_DT")
    private LocalDateTime createdDt;

    @Column(name="CREATED_BY")
    private String createdBy;

    @Column(name="UPDATED_DT")
    private LocalDateTime updatedDt;

    @Column(name="UPDATED_BY")
    private String updatedBy;

}
