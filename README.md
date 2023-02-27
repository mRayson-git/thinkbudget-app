# BudgetPwa

Budgeting doesn't have to be a complex thing, it's as simple as keeping your income > your expenses.
The problem is that with all the little expenses in life it's easy to lose the bigger picture.
This application aims to combat that problem by giving you a simple interface to keep track of that bigger picture.

## the tech
Currently this is a progressive web application made with the `Angular` framework and utilizing `IndexedDB` to store and query the records. IndexedDB follows a `same-origin` policy meaning that other website will not be able to query your data. While this does provide external protection, I'm looking into ways to support internal protection such as with `encryption`.

This application can be launched [here](https://thinkcomputing-budgetpwa.web.app/).