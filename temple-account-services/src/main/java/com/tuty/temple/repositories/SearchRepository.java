package com.tuty.temple.repositories;

import com.tuty.temple.model.GroupSummaryStatistics;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Map;

@NoRepositoryBean
public interface SearchRepository<T> {
    List<GroupSummaryStatistics> groupBy(String groupByField, String aggregationField, String aggregationType, Specification<T> specification);

}
