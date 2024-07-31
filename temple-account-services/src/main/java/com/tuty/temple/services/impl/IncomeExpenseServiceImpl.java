package com.tuty.temple.services.impl;

import com.tuty.temple.filter.PaymentSearchFilter;
import com.tuty.temple.model.GroupSummaryStatistics;
import com.tuty.temple.repositories.IncomeExpenseSearchRepository;
import com.tuty.temple.services.IncomeExpenseService;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/income")
public class IncomeExpenseServiceImpl implements IncomeExpenseService {

    private final IncomeExpenseSearchRepository searchRepository;

    @Override
    @GetMapping("/group-by")
    public List<GroupSummaryStatistics> incomeGroupBy(@ParameterObject PaymentSearchFilter paymentSearchFilter) {

        return searchRepository.groupBy( paymentSearchFilter.getGroupByField(), paymentSearchFilter.getAggregationType(), paymentSearchFilter.getAggregationField(), paymentSearchFilter.toSpecification());
    }



}
