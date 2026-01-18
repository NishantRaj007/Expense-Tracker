package com.expensetracker.expense_tracker.repository;

import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // 🔐 Fetch expenses by logged-in user (recommended)
    List<Expense> findByUser(User user);

    // 🔐 Alternative: fetch by username (also useful)
    List<Expense> findByUserUsername(String username);

    /* ================= ANALYTICS ================= */

    // 📅 Monthly total expenses for logged-in user
    @Query("""
        SELECT COALESCE(SUM(e.amount), 0)
        FROM Expense e
        WHERE e.user = :user
          AND e.date BETWEEN :startDate AND :endDate
    """)
    Double getMonthlyTotal(
            @Param("user") User user,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    // 📊 Category-wise total expenses for logged-in user
    @Query("""
        SELECT new map(e.category as category, SUM(e.amount) as total)
        FROM Expense e
        WHERE e.user = :user
        GROUP BY e.category
    """)
    List<Map<String, Object>> getCategoryTotals(@Param("user") User user);
}
