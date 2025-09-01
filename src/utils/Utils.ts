export function modPow(base: bigint, exp: bigint, modulus: bigint){
	base %= modulus;
	let result = 1n;
	while (exp > 0n) {
		if (exp & 1n) result = (result * base) % modulus;
		base = (base * base) % modulus;
		exp >>= 1n;
	}
	return result;
}