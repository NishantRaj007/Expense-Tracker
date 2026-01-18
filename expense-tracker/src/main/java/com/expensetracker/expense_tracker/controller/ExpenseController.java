package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000")
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    // ✅ Get ONLY logged-in user's expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // ✅ Get expense ONLY if it belongs to logged-in user
    @GetMapping("/{id}")
    public Expense getExpenseById(@PathVariable Long id) {
        return expenseService.getExpenseById(id)
                .orElseThrow(() ->
                        new RuntimeException("Expense not found or access denied")
                );
    }

    // ✅ Add expense for logged-in user
    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    // ✅ Update ONLY logged-in user's expense
    @PutMapping("/{id}")
    public Expense updateExpense(
            @PathVariable Long id,
            @RequestBody Expense expense
    ) {
        return expenseService.updateExpense(id, expense);
    }

    // ✅ Delete ONLY logged-in user's expense
    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    @GetMapping("/analytics/monthly-total")
    public Double getMonthlyTotal() {
        return expenseService.getCurrentMonthTotal();
    }

    @GetMapping("/analytics/category")
    public List<Map<String, Object>> getCategoryAnalytics() {
        return expenseService.getCategoryTotals();
    }

}
