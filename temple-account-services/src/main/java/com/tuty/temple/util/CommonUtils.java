package com.tuty.temple.util;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.Optional;
import java.util.function.Supplier;

public class CommonUtils {
    public static <T> Predicate applySpec(Specification<T> spec, Root<T> root, CriteriaQuery<?> query, CriteriaBuilder cb){
        if(spec == null) { return cb.conjunction();}
        return nvl(spec.toPredicate(root, query,cb), cb::conjunction);

    }
    public static <T> T nvl(T input, Supplier<T> defaultSupplier){
        return defaultSupplier == null ? input : Optional.ofNullable(input).orElseGet(defaultSupplier);
    }

    public static <T extends Annotation> T getAnnotation(Field field, Class<T> clazz){
        return Optional.ofNullable(field).map(f -> f.getAnnotation(clazz)).orElse(null);
    }
}
