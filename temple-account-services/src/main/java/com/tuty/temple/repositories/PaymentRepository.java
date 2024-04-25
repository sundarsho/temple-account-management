package com.tuty.temple.repositories;

import com.tuty.temple.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {

    @Query(value = "SELECT COALESCE(MAX(RECEIPT_NO), 1000) FROM PAYMENT WHERE FINANCIAL_YEAR =:financialYear", nativeQuery = true)
    int getMaxReceiptNo(@Param("financialYear") String financialYear);
}
