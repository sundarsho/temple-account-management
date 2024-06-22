package com.tuty.temple.services;

import com.tuty.temple.filter.PaymentSearchFilter;
import com.tuty.temple.model.GroupSummaryStatistics;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface IncomeExpenseService {

    List<GroupSummaryStatistics> incomeGroupBy(@RequestParam String field, @RequestParam String aggregation, PaymentSearchFilter paymentSearchFilter);

}
