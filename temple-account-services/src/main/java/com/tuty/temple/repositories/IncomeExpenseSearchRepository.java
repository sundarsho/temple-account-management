package com.tuty.temple.repositories;

import com.tuty.temple.entities.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Map;

public interface IncomeExpenseSearchRepository extends JpaRepository<Payment, Long>,
        JpaSpecificationExecutor<Payment>, SearchRepository<Payment> {
}
