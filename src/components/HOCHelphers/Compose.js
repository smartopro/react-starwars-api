const compose = (...args) => Component => {
    // if (args.length === 0) return Component;
    // const fn = args.pop();
    // return Compose(...args)(fn(Component));
    return args.reduceRight((acc, fn) => fn(acc), Component);
};

export default compose;
