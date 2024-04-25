package com.tuty.temple.services;

import com.tuty.temple.entities.Member;
import com.tuty.temple.entities.Payment;
import com.tuty.temple.filter.PaymentSearchFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PaymentService {
    Payment fetchPayment(Long paymentId);
    List<Payment> searchPayment(PaymentSearchFilter paymentSearchFilter);
    ResponseEntity<byte[]> exportPayment(PaymentSearchFilter paymentSearchFilter, HttpServletResponse response);

    Payment savePayment(Payment payment);
    void deletePayment(Long paymentId);
}
