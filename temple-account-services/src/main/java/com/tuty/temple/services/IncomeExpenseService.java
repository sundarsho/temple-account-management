package com.tuty.temple.services;

import com.tuty.temple.filter.MemberSearchFilter;
import com.tuty.temple.filter.PaymentSearchFilter;
import com.tuty.temple.model.GroupSummaryStatistics;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface IncomeExpenseService {

    List<GroupSummaryStatistics> incomeGroupBy(PaymentSearchFilter paymentSearchFilter);

    ResponseEntity<byte[]> groupByIncomeStatsExport(PaymentSearchFilter paymentSearchFilter, HttpServletResponse response);

}
