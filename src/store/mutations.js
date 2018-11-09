export default {
    changeCurrency(state, currencyCode, currencySymbol) {
        state.currencyCode = currencyCode
        state.currencySymbol = currencySymbol
        try {
            localStorage.currencyCode = currencyCode
            localStorage.currencySymbol = currencySymbol
        } catch(e) {}
    }
}