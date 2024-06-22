package com.tuty.temple.field;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface FieldMetadata {

    String displayName() default "";
    boolean ignore() default false;
    boolean exclude() default false;
    boolean readOnly() default false;
    boolean groupable() default false;
}
