package com.tuty.temple.services.impl;

import com.tuty.temple.filter.PaymentSearchFilter;
import com.tuty.temple.model.GroupSummaryStatistics;
import com.tuty.temple.repositories.IncomeExpenseSearchRepository;
import com.tuty.temple.services.IncomeExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Service
@RestController
@RequiredArgsConstructor
//@RequestMapping("")
public class IncomeExpenseServiceImpl implements IncomeExpenseService {

    private final IncomeExpenseSearchRepository searchRepository;

    @Override
    @GetMapping("/income/group-by")
    public List<GroupSummaryStatistics> incomeGroupBy(@RequestParam String field, @RequestParam(required = false) String aggregation, @RequestParam(required = true)PaymentSearchFilter paymentSearchFilter) {
        return searchRepository.groupBy(field, aggregation, "paymentAmount", paymentSearchFilter.toSpecification());
    }



}
