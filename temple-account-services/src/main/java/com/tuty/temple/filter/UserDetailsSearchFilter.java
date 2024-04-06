package com.tuty.temple.filter;

import com.tuty.temple.entities.User;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDetailsSearchFilter {

    private Long userId;
    private String name;
    private String fatherName;
    private String city;
    private String phone;
    private String whatsApp;
    private String gender;
    private String zipCode;
    private String ancestorVillage;
    private String emailId;

    public Specification<User> toSpecification(){
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            Map<String, String> stringFilters = new HashMap<>();
            stringFilters.put("name",name);
            stringFilters.put("fatherName", fatherName);
            stringFilters.put("gender",gender);
            stringFilters.put("ancestorVillage", ancestorVillage);
            stringFilters.put("city", city);
            stringFilters.put("zipCode", zipCode);
            stringFilters.put("phone", phone);
            stringFilters.put("emailId", emailId);

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

            if(Objects.nonNull(userId)){
                /*predicates.add(criteriaBuilder
                        .like(root.get("userId").as(String.class),"%"+userId+"%"));*/
                predicates.add(criteriaBuilder.equal(root.get("userId"), userId));

            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };

    }


}
