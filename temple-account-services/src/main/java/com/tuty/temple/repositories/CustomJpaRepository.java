package com.tuty.temple.repositories;

import com.tuty.temple.model.GroupSummaryStatistics;
import com.tuty.temple.util.CommonUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.util.Assert;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

public class CustomJpaRepository<T,ID> extends SimpleJpaRepository<T, ID>
        implements SearchRepository<T> {

    private final EntityManager entityManager;

    public CustomJpaRepository(JpaEntityInformation<T, ?> entityInformation, EntityManager entityManager) {
        super(entityInformation, entityManager);
        this.entityManager = entityManager;
    }

    @Override
    public List<GroupSummaryStatistics> groupBy(String field, String aggregation, String aggregationField, Specification<T> spec) {
        Assert.hasText(field, "Field name cannot be null/empty");
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object[]> query = builder.createQuery(Object[].class);
        Root<T> root = query.from(getDomainClass());
        query.multiselect(
                root.get(field),
                builder.count(root),
                builder.sum(root.get(aggregationField))
        );
        query.where(CommonUtils.applySpec(spec, root, query, builder));
        query.groupBy(root.get(field));
        query.orderBy(builder.asc(root.get(field)));
        List<Object[]> results = entityManager.createQuery(query).getResultList();
        return results.stream().map(r -> GroupSummaryStatistics.builder()
                .fieldName(field)
                .value(r[0].toString())
                .count((Long) r[1])
                .sum(r[2]!=null? (BigDecimal) r[2]: null)
                .build()).collect(Collectors.toList());

    }

}
