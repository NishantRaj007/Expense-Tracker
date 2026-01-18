package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import com.expensetracker.expense_tracker.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseService(
            ExpenseRepository expenseRepository,
            UserRepository userRepository
    ) {
        this.expenseRepository = expenseRepository;
        this.userRepository = userRepository;
    }

    /* ================= HELPER ================= */

    // 🔐 Get currently logged-in user from JWT
    private User getLoggedInUser() {
        String username = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found: " + username));
    }

    /* ================= CRUD ================= */

    // ✅ Get ONLY logged-in user's expenses
    public List<Expense> getAllExpenses() {
        User user = getLoggedInUser();
        return expenseRepository.findByUser(user);
    }

    // ✅ Get expense ONLY if it belongs to logged-in user
    public Optional<Expense> getExpenseById(Long id) {
        User user = getLoggedInUser();

        return expenseRepository.findById(id)
                .filter(expense -> expense.getUser().getId().equals(user.getId()));
    }

    // ✅ Add expense for logged-in user
    public Expense addExpense(Expense expense) {
        User user = getLoggedInUser();
        expense.setUser(user);
        return expenseRepository.save(expense);
    }

    // ✅ Update ONLY user's expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        User user = getLoggedInUser();

        return expenseRepository.findById(id)
                .filter(expense -> expense.getUser().getId().equals(user.getId()))
                .map(expense -> {
                    expense.setTitle(expenseDetails.getTitle());
                    expense.setAmount(expenseDetails.getAmount());
                    expense.setDate(expenseDetails.getDate());
                    expense.setCategory(expenseDetails.getCategory());
                    return expenseRepository.save(expense);
                })
                .orElseThrow(() -> new RuntimeException("Expense not found or access denied"));
    }

    // ✅ Delete ONLY user's expense
    public void deleteExpense(Long id) {
        User user = getLoggedInUser();

        Expense expense = expenseRepository.findById(id)
                .filter(e -> e.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Expense not found or access denied"));

        expenseRepository.delete(expense);
    }

    /* ================= ANALYTICS (STEP 6.2) ================= */

    // 📅 Get current month's total expenses
    public Double getCurrentMonthTotal() {
        User user = getLoggedInUser();

        YearMonth currentMonth = YearMonth.now();
        LocalDate startDate = currentMonth.atDay(1);
        LocalDate endDate = currentMonth.atEndOfMonth();

        return expenseRepository.getMonthlyTotal(user, startDate, endDate);
    }

    // 📊 Get category-wise totals
    public List<Map<String, Object>> getCategoryTotals() {
        User user = getLoggedInUser();
        return expenseRepository.getCategoryTotals(user);
    }
}
