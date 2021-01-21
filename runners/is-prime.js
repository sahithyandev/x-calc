const meta = {
  name: "is prime?",
  description: "Checks if a number is a prime number",
}

export default {
  meta,
  /**
   * @param {number} n
   *
   * @exports boolean
   */
  runner: (n) => {
    for (let divisor_i = 2; divisor_i <= n / 2; divisor_i++) {
      if (n % divisor_i === 0) return false
    }
    return true
  },
}
