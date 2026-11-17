/*
 * Fails any test that logs an error or a warning, such as React's warning about an update outside act(). React only
 * logs these, so without this a test passes while the screen misbehaves.
 * packages/api/src/failOnConsoleOutput.ts is the same check for Vitest.
 */
const loggedMessages: string[] = [];

// Returns the message with its %s-style placeholders filled in, as the console shows it.
const formatMessage = ([template, ...values]: unknown[]) => {
	if (typeof template !== 'string') {
		return [template, ...values].map(String).join(' ');
	}
	const unusedValues = [...values];
	const text = template.replace(/%[sdio]/g, () => String(unusedValues.shift()));
	return [text, ...unusedValues.map(String)].join(' ');
};

for (const level of ['error', 'warn'] as const) {
	const writeToConsole = console[level];
	console[level] = (...args: unknown[]) => {
		loggedMessages.push(`console.${level}: ${formatMessage(args)}`);
		writeToConsole(...args);
	};
}

const expectNothingLogged = () => {
	const messages = loggedMessages.splice(0);
	// Jest's expect takes no message, so the messages themselves explain the failure.
	expect(messages).toEqual([]);
};

afterEach(expectNothingLogged);
afterAll(expectNothingLogged);
