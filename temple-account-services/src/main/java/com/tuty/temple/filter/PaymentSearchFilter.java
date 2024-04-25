package com.tuty.temple.filter;

import com.tuty.temple.entities.Payment;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentSearchFilter {

    private Long paymentId;
    private Long memberId;
    private Long receiptNo;
    private String occasion;
    private String paymentType;
    private String financialYear;
    private LocalDate paymentDate;
    private String paymentMode;

    public Specification<Payment> toSpecification(){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Map<String, String> stringFilters = new HashMap<>();
            stringFilters.put("occasion",occasion);
            stringFilters.put("paymentType", paymentType);
            stringFilters.put("financialYear", financialYear);
            stringFilters.put("paymentDate", String.valueOf(paymentDate));
            stringFilters.put("paymentMode", paymentMode);
            stringFilters.put("receiptNo", String.valueOf(receiptNo));

            stringFilters.forEach((fieldName, value) -> {
                if(StringUtils.isBlank(value)) return;
                Expression<String> searchExpr = criteriaBuilder.lower(root.get(fieldName));
                String searchVal = StringUtils.lowerCase(value);

                if(StringUtils.contains(value, "*")){
                    predicates.add(criteriaBuilder.like(searchExpr, StringUtils.replace(searchVal, "*", "%")));
                }else{
                    predicates.add(criteriaBuilder.equal(searchExpr,searchVal));
                }
            });

            if(Objects.nonNull(memberId)){
                predicates.add(criteriaBuilder.equal(root.get("memberId"), memberId));
            }

            if(Objects.nonNull(paymentId)){
                predicates.add(criteriaBuilder.equal(root.get("paymentId"), paymentId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

    }
}
