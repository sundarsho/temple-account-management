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

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/income")
public class IncomeExpenseServiceImpl implements IncomeExpenseService {

    private final IncomeExpenseSearchRepository searchRepository;
    @Autowired
    ExportReportService exportReportService;
    @Override
    @GetMapping("/group-by")
    public List<GroupSummaryStatistics> incomeGroupBy(@ParameterObject PaymentSearchFilter paymentSearchFilter) {
        return searchRepository.groupBy( paymentSearchFilter.getGroupByField(), paymentSearchFilter.getAggregationType(), paymentSearchFilter.getAggregationField(), paymentSearchFilter.toSpecification());
    }

    @Override
    @GetMapping("/group-by/export")
    public ResponseEntity<byte[]> groupByIncomeStatsExport(@ParameterObject PaymentSearchFilter paymentSearchFilter, HttpServletResponse response) {
        try{
            List<GroupSummaryStatistics> groupSummaryStatistics = searchRepository.groupBy( paymentSearchFilter.getGroupByField(), paymentSearchFilter.getAggregationType(), paymentSearchFilter.getAggregationField(), paymentSearchFilter.toSpecification());
            String fileName = "export_payment_stats_"+ LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss")) + ".csv";
            byte[] byteArray = exportReportService.exportToCSV(fileName, groupSummaryStatistics, GroupSummaryStatistics.class, null);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);
            return new ResponseEntity<>(byteArray, headers, HttpStatus.OK);
        } catch(IOException e) {
            // Handle export errors
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
