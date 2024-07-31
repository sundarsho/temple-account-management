package com.tuty.temple.services.impl;

import com.tuty.temple.entities.Payment;
import com.tuty.temple.field.FieldMetadata;
import com.tuty.temple.filter.PaymentSearchFilter;
import com.tuty.temple.repositories.PaymentRepository;
import com.tuty.temple.services.PaymentService;
import com.tuty.temple.util.CommonUtils;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RestController
@Slf4j
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/v1")
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    ExportReportService exportReportService;

    @Autowired
    PaymentRepository paymentRepository;

    @Override
    @GetMapping("/payment")
    public Payment fetchPayment(Long paymentId) {
        return paymentRepository.findById(paymentId).orElse(null);
    }

    @Override
    @PostMapping(value = "/payment/save")
    public Payment savePayment(@RequestBody Payment payment) {

        if(payment.getPaymentId()!=null){
            payment.setUpdatedBy("admin");
            payment.setUpdatedDt(LocalDateTime.now());
        }else{
            long receiptNo = paymentRepository.getMaxReceiptNo(payment.getFinancialYear())+1;
            payment.setReceiptNo(receiptNo);
            payment.setCreatedBy("admin");
            payment.setCreatedDt(LocalDateTime.now());
        }
        return paymentRepository.save(payment);
    }

    @Override
    @DeleteMapping(value = "/payment/delete")
    public void deletePayment(Long paymentId) {
        paymentRepository.deleteById(paymentId);
    }

    @Override
    @GetMapping("/payment/search")
    public List<Payment> searchPayment(PaymentSearchFilter paymentSearchFilter) {
        return paymentRepository.findAll(paymentSearchFilter.toSpecification());
    }

    @Override
    @GetMapping("/payment/export")
    public ResponseEntity<byte[]> exportPayment(PaymentSearchFilter paymentSearchFilter, HttpServletResponse response) {
        String fileName = "export_Payment_"+ LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd-HH-mm-ss")) + ".csv";
        List<String> ignoreFields = Arrays.asList("streetAddress1","streetAddress2","streetAddress3","state","zipCode",
                "whatsApp", "status", "notes", "createdDt", "createdBy", "updatedDt", "updatedBy");
        try{

            List<Payment> payments = searchPayment(paymentSearchFilter);
            // Export data to CSV
            byte[] byteArray = exportReportService.exportToCSV(fileName, payments, Payment.class, ignoreFields);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", fileName);
            // Return the exported file as a byte array
            return new ResponseEntity<>(byteArray, headers, HttpStatus.OK);
        } catch(IOException e) {
            // Handle export errors
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/payment/group-fields")
    public List<String> findPaymentGroupFields(){
        Field[] fields = Payment.class.getDeclaredFields();
        return Arrays.stream(fields)
                .filter(f -> CommonUtils.getAnnotation(f, FieldMetadata.class) != null)
                .map(Field::getName)
                .collect(Collectors.toList());
    }


}
