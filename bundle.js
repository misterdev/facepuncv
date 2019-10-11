
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function create_slot(definition, ctx, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.ctx, definition[1](fn ? fn(ctx) : {})))
            : ctx.$$scope.ctx;
    }
    function get_slot_changes(definition, ctx, changed, fn) {
        return definition[1]
            ? assign({}, assign(ctx.$$scope.changed || {}, definition[1](fn ? fn(changed) : {})))
            : ctx.$$scope.changed || {};
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, ret, value = ret) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
                return ret;
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, detail));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.data === data)
            return;
        dispatch_dev("SvelteDOMSetData", { node: text, data });
        text.data = data;
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = [];
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (let i = 0; i < subscribers.length; i += 1) {
                        const s = subscribers[i];
                        s[1]();
                        subscriber_queue.push(s, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.push(subscriber);
            if (subscribers.length === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                const index = subscribers.indexOf(subscriber);
                if (index !== -1) {
                    subscribers.splice(index, 1);
                }
                if (subscribers.length === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const categories = {
        EXP: {
            id: 'EXPERIENCE',
            label: 'Experience',
            count: 4,
        },
        EDU: {
            id: 'EDUCATION',
            label: 'Education',
            count: 3,
        },
        PROJ: {
            id: 'PROJECTS',
            label: 'Projects',
            count: 7,
        }
    };

    const navigation = writable({cat: categories.EXP.id, selected: 0});

    let content = {};
    content.EXPERIENCE = [
        {
            // icon
            label: "Webpack",
            icon: "images/webpack.png",
            date: {
                start: "Dec 18",
                end: "Aug 19"
            },
            // 
            description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            Webpack (Remote work)
        </p>
        After contributing to Webpack, I've been selected globally for the "Google Summer of Code 2019" to design and develop a modular output reporting system for webpack
        `,
            links: [
                {
                    icon: "images/gsoc.png",
                    url: "https://summerofcode.withgoogle.com/",
                    label: "GSoC Website"
                },
                {
                    icon: "images/github.png",
                    url: "https://github.com/misterdev/webpack-reporter-plugin",
                    label: "Repository"
                }
            ],
            stats: [
                {
                    label: 'Javascript',
                    count: 800
                },
                {
                    label: 'Typescript',
                    count: 800
                },
                {
                    label: 'Webpack',
                    count: 900
                },
                {
                    label: 'Git',
                    count: 600
                }
            ]
        },
        {
            // icon
            label: "Lay Lab",
            icon: "images/laylab.png",
            date: {
                start: "Dec 18",
                end: "Aug 19"
            },
            // 
            description: `
        <p>
            <b>Fullstack Javascript Developer</b></br>
            Lay Lab (Altedo, BO)
        </p>
        I worked on web projects like the company website and a mobile app with a complex backend using web technologies (Ionic, NodeJS, Firebase, elasticsearch, ...)
        `,
            links: [
                {
                    icon: "images/laylab.png",
                    url: "https://github.com/misterdev/webpack-reporter-plugin"
                }
            ],
            stats: [
                {
                    label: 'Firebase',
                    count: 1000
                },
                {
                    label: 'NodeJS',
                    count: 900
                },
                {
                    label: 'Ionic',
                    count: 900
                },
                {
                    label: 'ElasticSearch',
                    count: 300
                },
                {
                    label: 'Google Cloud Engine',
                    count: 300
                }
            ]
        },
        {
            // icon
            label: "MIT App Inventor",
            icon: "images/appinventor.png",
            date: {
                start: "Jun 15",
                end: "Sep 15"
            },
            // 
            description: `
        <p>
            <b>OSS Javascript Developer</b></br>
            MIT Media Lab (Massachusetts, US - Remote work)
        </p>
        I've been selected globally for the "Google Summer of Code 2015" to work on an organization tool for the Blockly editor of MIT App Inventor 2
        `,
            links: [
                {
                    icon: "images/gsoc.png",
                    url: "https://www.google-melange.com/archive/gsoc/2015/orgs/media/projects/misterdev.html"
                },
                {
                    icon: "images/gdoc.png",
                    url: "https://docs.google.com/document/d/1nzdrNGGjEptc7phiU6JOuV8UQTZRNH_0Ve8lukBIZuI"
                }
            ],
            stats: [
                {
                    label: 'Javascript',
                    count: 700
                }
            ]
        },
        {
            // icon
            label: "DMDTEK",
            icon: "images/android.png",
            date: {
                start: "Dec 18",
                end: "Aug 19"
            },
            // 
            description: `
        <p>
            <b>Android Developer</b></br>
            DMDTEK S.R.L (Imola, BO)
        </p>
        I developed a module for and Android embedded system
        `,
            links: [],
            stats: [
                {
                    label: 'Android',
                    count: 60
                }
            ]
        }
    ];

    content.EDUCATION = [
        {
            // icon
            label: "CS Master",
            icon: "images/alma.png",
            date: {
                start: "Sep 16",
                end: "Mar 20"
            },
            // 
            description: `
        <p><b>University of Bologna</p></b>

        Master degree in Computer Science</br>
        Average Grade: 29.55
        `,
            links: [],
            stats: []
        },
        {
            // icon
            label: "CS Bachelor",
            icon: "images/alma.png",
            date: {
                start: "Sep 12",
                end: "Dec 16"
            },
            // 
            description: `
        <p><b>University of Bologna</p></b>

        Bachelor degree in Computer Science</br>
        Score 98/110
        `,
            links: [],
            stats: []
        },
        {
            // icon
            label: "IT Degree",
            icon: "images/itis.png",
            date: {
                start: "Sep 07",
                end: "Aug 12"
            },
            // 
            description: `
        <p><b>ITIS Odone Belluzzi</p></b>

        Bachelor degree in Computer Science</br>
        Score 86/100        
        `,
            links: [],
            stats: []
        },
    ];

    content.PROJECTS = [
        {
            // icon
            label: "IT Degree",
            icon: "images/alma.png",
            date: "25 dicc",
            // 
            description: "...",
            links: [],
            stats: []
        },
    ];

    // github
    // twitter
    // linkedin
    // stackoverflow
    // mail
    // medium?

    /* node_modules/svelte-icons/components/IconBase.svelte generated by Svelte v3.12.1 */

    const file = "node_modules/svelte-icons/components/IconBase.svelte";

    // (18:2) {#if title}
    function create_if_block(ctx) {
    	var title_1, t;

    	const block = {
    		c: function create() {
    			title_1 = svg_element("title");
    			t = text(ctx.title);
    			add_location(title_1, file, 18, 4, 298);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, title_1, anchor);
    			append_dev(title_1, t);
    		},

    		p: function update(changed, ctx) {
    			if (changed.title) {
    				set_data_dev(t, ctx.title);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(title_1);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_if_block.name, type: "if", source: "(18:2) {#if title}", ctx });
    	return block;
    }

    function create_fragment(ctx) {
    	var svg, if_block_anchor, current;

    	var if_block = (ctx.title) && create_if_block(ctx);

    	const default_slot_template = ctx.$$slots.default;
    	const default_slot = create_slot(default_slot_template, ctx, null);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (if_block) if_block.c();
    			if_block_anchor = empty();

    			if (default_slot) default_slot.c();

    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", ctx.viewBox);
    			attr_dev(svg, "class", "svelte-c8tyih");
    			add_location(svg, file, 16, 0, 229);
    		},

    		l: function claim(nodes) {
    			if (default_slot) default_slot.l(svg_nodes);
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			if (if_block) if_block.m(svg, null);
    			append_dev(svg, if_block_anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (ctx.title) {
    				if (if_block) {
    					if_block.p(changed, ctx);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(svg, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (default_slot && default_slot.p && changed.$$scope) {
    				default_slot.p(
    					get_slot_changes(default_slot_template, ctx, changed, null),
    					get_slot_context(default_slot_template, ctx, null)
    				);
    			}

    			if (!current || changed.viewBox) {
    				attr_dev(svg, "viewBox", ctx.viewBox);
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(svg);
    			}

    			if (if_block) if_block.d();

    			if (default_slot) default_slot.d(detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { title = null, viewBox } = $$props;

    	const writable_props = ['title', 'viewBox'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<IconBase> was created with unknown prop '${key}'`);
    	});

    	let { $$slots = {}, $$scope } = $$props;

    	$$self.$set = $$props => {
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('viewBox' in $$props) $$invalidate('viewBox', viewBox = $$props.viewBox);
    		if ('$$scope' in $$props) $$invalidate('$$scope', $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => {
    		return { title, viewBox };
    	};

    	$$self.$inject_state = $$props => {
    		if ('title' in $$props) $$invalidate('title', title = $$props.title);
    		if ('viewBox' in $$props) $$invalidate('viewBox', viewBox = $$props.viewBox);
    	};

    	return { title, viewBox, $$slots, $$scope };
    }

    class IconBase extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, ["title", "viewBox"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "IconBase", options, id: create_fragment.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.viewBox === undefined && !('viewBox' in props)) {
    			console.warn("<IconBase> was created without expected prop 'viewBox'");
    		}
    	}

    	get title() {
    		throw new Error("<IconBase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set title(value) {
    		throw new Error("<IconBase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get viewBox() {
    		throw new Error("<IconBase>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set viewBox(value) {
    		throw new Error("<IconBase>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-icons/md/MdBusinessCenter.svelte generated by Svelte v3.12.1 */

    const file$1 = "node_modules/svelte-icons/md/MdBusinessCenter.svelte";

    // (4:8) <IconBase viewBox="0 0 24 24" {...$$props}>
    function create_default_slot(ctx) {
    	var path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M10 16v-1H3.01L3 19c0 1.11.89 2 2 2h14c1.11 0 2-.89 2-2v-4h-7v1h-4zm10-9h-4.01V5l-2-2h-4l-2 2v2H4c-1.1 0-2 .9-2 2v3c0 1.11.89 2 2 2h6v-2h4v2h6c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-6 0h-4V5h4v2z");
    			add_location(path, file$1, 4, 10, 151);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(path);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot.name, type: "slot", source: "(4:8) <IconBase viewBox=\"0 0 24 24\" {...$$props}>", ctx });
    	return block;
    }

    function create_fragment$1(ctx) {
    	var current;

    	var iconbase_spread_levels = [
    		{ viewBox: "0 0 24 24" },
    		ctx.$$props
    	];

    	let iconbase_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};
    	for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
    	}
    	var iconbase = new IconBase({ props: iconbase_props, $$inline: true });

    	const block = {
    		c: function create() {
    			iconbase.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(iconbase, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var iconbase_changes = (changed.$$props) ? get_spread_update(iconbase_spread_levels, [
    									iconbase_spread_levels[0],
    			get_spread_object(ctx.$$props)
    								]) : {};
    			if (changed.$$scope) iconbase_changes.$$scope = { changed, ctx };
    			iconbase.$set(iconbase_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbase.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(iconbase.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(iconbase, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$1.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	$$self.$set = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	$$self.$capture_state = () => {
    		return {  };
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	return {
    		$$props,
    		$$props: $$props = exclude_internal_props($$props)
    	};
    }

    class MdBusinessCenter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MdBusinessCenter", options, id: create_fragment$1.name });
    	}
    }

    /* node_modules/svelte-icons/md/MdSchool.svelte generated by Svelte v3.12.1 */

    const file$2 = "node_modules/svelte-icons/md/MdSchool.svelte";

    // (4:8) <IconBase viewBox="0 0 24 24" {...$$props}>
    function create_default_slot$1(ctx) {
    	var path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z");
    			add_location(path, file$2, 4, 10, 151);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(path);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$1.name, type: "slot", source: "(4:8) <IconBase viewBox=\"0 0 24 24\" {...$$props}>", ctx });
    	return block;
    }

    function create_fragment$2(ctx) {
    	var current;

    	var iconbase_spread_levels = [
    		{ viewBox: "0 0 24 24" },
    		ctx.$$props
    	];

    	let iconbase_props = {
    		$$slots: { default: [create_default_slot$1] },
    		$$scope: { ctx }
    	};
    	for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
    	}
    	var iconbase = new IconBase({ props: iconbase_props, $$inline: true });

    	const block = {
    		c: function create() {
    			iconbase.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(iconbase, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var iconbase_changes = (changed.$$props) ? get_spread_update(iconbase_spread_levels, [
    									iconbase_spread_levels[0],
    			get_spread_object(ctx.$$props)
    								]) : {};
    			if (changed.$$scope) iconbase_changes.$$scope = { changed, ctx };
    			iconbase.$set(iconbase_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbase.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(iconbase.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(iconbase, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$2.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	$$self.$set = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	$$self.$capture_state = () => {
    		return {  };
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	return {
    		$$props,
    		$$props: $$props = exclude_internal_props($$props)
    	};
    }

    class MdSchool extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MdSchool", options, id: create_fragment$2.name });
    	}
    }

    /* node_modules/svelte-icons/md/MdFolder.svelte generated by Svelte v3.12.1 */

    const file$3 = "node_modules/svelte-icons/md/MdFolder.svelte";

    // (4:8) <IconBase viewBox="0 0 24 24" {...$$props}>
    function create_default_slot$2(ctx) {
    	var path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z");
    			add_location(path, file$3, 4, 10, 151);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(path);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$2.name, type: "slot", source: "(4:8) <IconBase viewBox=\"0 0 24 24\" {...$$props}>", ctx });
    	return block;
    }

    function create_fragment$3(ctx) {
    	var current;

    	var iconbase_spread_levels = [
    		{ viewBox: "0 0 24 24" },
    		ctx.$$props
    	];

    	let iconbase_props = {
    		$$slots: { default: [create_default_slot$2] },
    		$$scope: { ctx }
    	};
    	for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
    	}
    	var iconbase = new IconBase({ props: iconbase_props, $$inline: true });

    	const block = {
    		c: function create() {
    			iconbase.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(iconbase, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var iconbase_changes = (changed.$$props) ? get_spread_update(iconbase_spread_levels, [
    									iconbase_spread_levels[0],
    			get_spread_object(ctx.$$props)
    								]) : {};
    			if (changed.$$scope) iconbase_changes.$$scope = { changed, ctx };
    			iconbase.$set(iconbase_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbase.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(iconbase.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(iconbase, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$3.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	$$self.$set = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	$$self.$capture_state = () => {
    		return {  };
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	return {
    		$$props,
    		$$props: $$props = exclude_internal_props($$props)
    	};
    }

    class MdFolder extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MdFolder", options, id: create_fragment$3.name });
    	}
    }

    /* src/crafting/Categories.svelte generated by Svelte v3.12.1 */

    const file$4 = "src/crafting/Categories.svelte";

    function create_fragment$4(ctx) {
    	var div12, div3, div0, t0, div1, b0, t2, div2, b1, t4, div7, div4, t5, div5, b2, t7, div6, b3, t9, div11, div8, t10, div9, b4, t12, div10, b5, current, dispose;

    	var mdbusinesscenter = new MdBusinessCenter({ $$inline: true });

    	var mdschool = new MdSchool({ $$inline: true });

    	var mdfolder = new MdFolder({ $$inline: true });

    	const block = {
    		c: function create() {
    			div12 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			mdbusinesscenter.$$.fragment.c();
    			t0 = space();
    			div1 = element("div");
    			b0 = element("b");
    			b0.textContent = "EXPERIENCE";
    			t2 = space();
    			div2 = element("div");
    			b1 = element("b");
    			b1.textContent = "4";
    			t4 = space();
    			div7 = element("div");
    			div4 = element("div");
    			mdschool.$$.fragment.c();
    			t5 = space();
    			div5 = element("div");
    			b2 = element("b");
    			b2.textContent = "EDUCATION";
    			t7 = space();
    			div6 = element("div");
    			b3 = element("b");
    			b3.textContent = "3";
    			t9 = space();
    			div11 = element("div");
    			div8 = element("div");
    			mdfolder.$$.fragment.c();
    			t10 = space();
    			div9 = element("div");
    			b4 = element("b");
    			b4.textContent = "PROJECTS";
    			t12 = space();
    			div10 = element("div");
    			b5 = element("b");
    			b5.textContent = "7";
    			attr_dev(div0, "class", "icon svelte-1av1djq");
    			add_location(div0, file$4, 14, 8, 562);
    			add_location(b0, file$4, 17, 13, 642);
    			add_location(div1, file$4, 17, 8, 637);
    			add_location(b1, file$4, 18, 29, 695);
    			attr_dev(div2, "class", "counter svelte-1av1djq");
    			add_location(div2, file$4, 18, 8, 674);
    			attr_dev(div3, "class", "item svelte-1av1djq");
    			add_location(div3, file$4, 13, 4, 495);
    			attr_dev(div4, "class", "icon svelte-1av1djq");
    			add_location(div4, file$4, 21, 8, 792);
    			add_location(b2, file$4, 24, 13, 864);
    			add_location(div5, file$4, 24, 8, 859);
    			add_location(b3, file$4, 25, 29, 916);
    			attr_dev(div6, "class", "counter svelte-1av1djq");
    			add_location(div6, file$4, 25, 8, 895);
    			attr_dev(div7, "class", "item svelte-1av1djq");
    			add_location(div7, file$4, 20, 4, 725);
    			attr_dev(div8, "class", "icon svelte-1av1djq");
    			add_location(div8, file$4, 28, 8, 1014);
    			add_location(b4, file$4, 31, 13, 1086);
    			add_location(div9, file$4, 31, 8, 1081);
    			add_location(b5, file$4, 32, 29, 1137);
    			attr_dev(div10, "class", "counter svelte-1av1djq");
    			add_location(div10, file$4, 32, 8, 1116);
    			attr_dev(div11, "class", "item svelte-1av1djq");
    			add_location(div11, file$4, 27, 4, 946);
    			attr_dev(div12, "id", "wrapper");
    			attr_dev(div12, "class", "svelte-1av1djq");
    			add_location(div12, file$4, 12, 0, 472);

    			dispose = [
    				listen_dev(div3, "click", ctx.click_handler),
    				listen_dev(div7, "click", ctx.click_handler_1),
    				listen_dev(div11, "click", ctx.click_handler_2)
    			];
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div12, anchor);
    			append_dev(div12, div3);
    			append_dev(div3, div0);
    			mount_component(mdbusinesscenter, div0, null);
    			append_dev(div3, t0);
    			append_dev(div3, div1);
    			append_dev(div1, b0);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, b1);
    			append_dev(div12, t4);
    			append_dev(div12, div7);
    			append_dev(div7, div4);
    			mount_component(mdschool, div4, null);
    			append_dev(div7, t5);
    			append_dev(div7, div5);
    			append_dev(div5, b2);
    			append_dev(div7, t7);
    			append_dev(div7, div6);
    			append_dev(div6, b3);
    			append_dev(div12, t9);
    			append_dev(div12, div11);
    			append_dev(div11, div8);
    			mount_component(mdfolder, div8, null);
    			append_dev(div11, t10);
    			append_dev(div11, div9);
    			append_dev(div9, b4);
    			append_dev(div11, t12);
    			append_dev(div11, div10);
    			append_dev(div10, b5);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(mdbusinesscenter.$$.fragment, local);

    			transition_in(mdschool.$$.fragment, local);

    			transition_in(mdfolder.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(mdbusinesscenter.$$.fragment, local);
    			transition_out(mdschool.$$.fragment, local);
    			transition_out(mdfolder.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div12);
    			}

    			destroy_component(mdbusinesscenter);

    			destroy_component(mdschool);

    			destroy_component(mdfolder);

    			run_all(dispose);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$4.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$4($$self) {
    	
        // const items = Object.keys(categories).map(k => categories[k]) 

        const selectCat = (catId) => {
            navigation.update(nav => ({cat: catId, selected: 0}));
        };

    	const click_handler = () => selectCat(categories.EXP.id);

    	const click_handler_1 = () => selectCat(categories.EDU.id);

    	const click_handler_2 = () => selectCat(categories.PROJ.id);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {};

    	return {
    		selectCat,
    		click_handler,
    		click_handler_1,
    		click_handler_2
    	};
    }

    class Categories extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Categories", options, id: create_fragment$4.name });
    	}
    }

    /* src/crafting/List.svelte generated by Svelte v3.12.1 */

    const file$5 = "src/crafting/List.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.label = list[i].label;
    	child_ctx.icon = list[i].icon;
    	child_ctx.i = i;
    	return child_ctx;
    }

    // (17:4) {#each items as { label, icon}
    function create_each_block(ctx) {
    	var div, img, img_src_value, t, dispose;

    	function click_handler() {
    		return ctx.click_handler(ctx);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			img = element("img");
    			t = space();
    			attr_dev(img, "src", img_src_value = ctx.icon);
    			attr_dev(img, "alt", "icon");
    			attr_dev(img, "class", "svelte-brrfsv");
    			add_location(img, file$5, 18, 12, 471);
    			attr_dev(div, "class", "item svelte-brrfsv");
    			add_location(div, file$5, 17, 8, 409);
    			dispose = listen_dev(div, "click", click_handler);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, img);
    			append_dev(div, t);
    		},

    		p: function update(changed, new_ctx) {
    			ctx = new_ctx;
    			if ((changed.items) && img_src_value !== (img_src_value = ctx.icon)) {
    				attr_dev(img, "src", img_src_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			dispose();
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block.name, type: "each", source: "(17:4) {#each items as { label, icon}", ctx });
    	return block;
    }

    function create_fragment$5(ctx) {
    	var div;

    	let each_value = ctx.items;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div, "class", "wrapper svelte-brrfsv");
    			add_location(div, file$5, 15, 0, 340);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if (changed.items) {
    				each_value = ctx.items;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$5.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let items;
        let selected;

        navigation.subscribe(nav => {
            $$invalidate('items', items = content[nav.cat]);
            selected = nav.selected;
        });

        const selectItem = (index) => {
            navigation.update(({cat, selected}) => ({cat, selected: index}));
        };

    	const click_handler = ({ i }) => selectItem(i);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('items' in $$props) $$invalidate('items', items = $$props.items);
    		if ('selected' in $$props) selected = $$props.selected;
    	};

    	return { items, selectItem, click_handler };
    }

    class List extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "List", options, id: create_fragment$5.name });
    	}
    }

    /* node_modules/svelte-icons/md/MdAccessTime.svelte generated by Svelte v3.12.1 */

    const file$6 = "node_modules/svelte-icons/md/MdAccessTime.svelte";

    // (4:8) <IconBase viewBox="0 0 24 24" {...$$props}>
    function create_default_slot$3(ctx) {
    	var path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z");
    			add_location(path, file$6, 4, 10, 151);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(path);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$3.name, type: "slot", source: "(4:8) <IconBase viewBox=\"0 0 24 24\" {...$$props}>", ctx });
    	return block;
    }

    function create_fragment$6(ctx) {
    	var current;

    	var iconbase_spread_levels = [
    		{ viewBox: "0 0 24 24" },
    		ctx.$$props
    	];

    	let iconbase_props = {
    		$$slots: { default: [create_default_slot$3] },
    		$$scope: { ctx }
    	};
    	for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
    	}
    	var iconbase = new IconBase({ props: iconbase_props, $$inline: true });

    	const block = {
    		c: function create() {
    			iconbase.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(iconbase, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var iconbase_changes = (changed.$$props) ? get_spread_update(iconbase_spread_levels, [
    									iconbase_spread_levels[0],
    			get_spread_object(ctx.$$props)
    								]) : {};
    			if (changed.$$scope) iconbase_changes.$$scope = { changed, ctx };
    			iconbase.$set(iconbase_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbase.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(iconbase.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(iconbase, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$6.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	$$self.$set = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	$$self.$capture_state = () => {
    		return {  };
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	return {
    		$$props,
    		$$props: $$props = exclude_internal_props($$props)
    	};
    }

    class MdAccessTime extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MdAccessTime", options, id: create_fragment$6.name });
    	}
    }

    /* node_modules/svelte-icons/md/MdAlarm.svelte generated by Svelte v3.12.1 */

    const file$7 = "node_modules/svelte-icons/md/MdAlarm.svelte";

    // (4:8) <IconBase viewBox="0 0 24 24" {...$$props}>
    function create_default_slot$4(ctx) {
    	var path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z");
    			add_location(path, file$7, 4, 10, 151);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(path);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_default_slot$4.name, type: "slot", source: "(4:8) <IconBase viewBox=\"0 0 24 24\" {...$$props}>", ctx });
    	return block;
    }

    function create_fragment$7(ctx) {
    	var current;

    	var iconbase_spread_levels = [
    		{ viewBox: "0 0 24 24" },
    		ctx.$$props
    	];

    	let iconbase_props = {
    		$$slots: { default: [create_default_slot$4] },
    		$$scope: { ctx }
    	};
    	for (var i = 0; i < iconbase_spread_levels.length; i += 1) {
    		iconbase_props = assign(iconbase_props, iconbase_spread_levels[i]);
    	}
    	var iconbase = new IconBase({ props: iconbase_props, $$inline: true });

    	const block = {
    		c: function create() {
    			iconbase.$$.fragment.c();
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			mount_component(iconbase, target, anchor);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			var iconbase_changes = (changed.$$props) ? get_spread_update(iconbase_spread_levels, [
    									iconbase_spread_levels[0],
    			get_spread_object(ctx.$$props)
    								]) : {};
    			if (changed.$$scope) iconbase_changes.$$scope = { changed, ctx };
    			iconbase.$set(iconbase_changes);
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(iconbase.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(iconbase.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			destroy_component(iconbase, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$7.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	$$self.$set = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	$$self.$capture_state = () => {
    		return {  };
    	};

    	$$self.$inject_state = $$new_props => {
    		$$invalidate('$$props', $$props = assign(assign({}, $$props), $$new_props));
    	};

    	return {
    		$$props,
    		$$props: $$props = exclude_internal_props($$props)
    	};
    }

    class MdAlarm extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "MdAlarm", options, id: create_fragment$7.name });
    	}
    }

    /* src/crafting/Description.svelte generated by Svelte v3.12.1 */

    const file$8 = "src/crafting/Description.svelte";

    function create_fragment$8(ctx) {
    	var div8, div6, img, img_src_value, t0, div0, b, t1_value = ctx.item.label + "", t1, t2, div5, div2, div1, t3, t4_value = ctx.item.date.start + "", t4, t5, div4, div3, t6, t7_value = ctx.item.date.end + "", t7, t8, div7, raw_value = ctx.item.description + "", current;

    	var mdaccesstime = new MdAccessTime({ $$inline: true });

    	var mdalarm = new MdAlarm({ $$inline: true });

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div6 = element("div");
    			img = element("img");
    			t0 = space();
    			div0 = element("div");
    			b = element("b");
    			t1 = text(t1_value);
    			t2 = space();
    			div5 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			mdaccesstime.$$.fragment.c();
    			t3 = space();
    			t4 = text(t4_value);
    			t5 = space();
    			div4 = element("div");
    			div3 = element("div");
    			mdalarm.$$.fragment.c();
    			t6 = space();
    			t7 = text(t7_value);
    			t8 = space();
    			div7 = element("div");
    			attr_dev(img, "src", img_src_value = ctx.item.icon);
    			attr_dev(img, "alt", "logo");
    			attr_dev(img, "class", "svelte-73ccdk");
    			add_location(img, file$8, 12, 8, 364);
    			add_location(b, file$8, 13, 24, 423);
    			attr_dev(div0, "id", "title");
    			attr_dev(div0, "class", "svelte-73ccdk");
    			add_location(div0, file$8, 13, 8, 407);
    			attr_dev(div1, "class", "icon svelte-73ccdk");
    			add_location(div1, file$8, 16, 16, 518);
    			attr_dev(div2, "id", "start");
    			attr_dev(div2, "class", "svelte-73ccdk");
    			add_location(div2, file$8, 15, 12, 485);
    			attr_dev(div3, "class", "icon svelte-73ccdk");
    			add_location(div3, file$8, 22, 16, 693);
    			attr_dev(div4, "id", "end");
    			attr_dev(div4, "class", "svelte-73ccdk");
    			add_location(div4, file$8, 21, 12, 662);
    			attr_dev(div5, "id", "time");
    			attr_dev(div5, "class", "svelte-73ccdk");
    			add_location(div5, file$8, 14, 8, 457);
    			attr_dev(div6, "id", "header");
    			attr_dev(div6, "class", "svelte-73ccdk");
    			add_location(div6, file$8, 11, 4, 338);
    			attr_dev(div7, "id", "description");
    			attr_dev(div7, "class", "svelte-73ccdk");
    			add_location(div7, file$8, 29, 4, 848);
    			attr_dev(div8, "id", "wrapper");
    			attr_dev(div8, "class", "svelte-73ccdk");
    			add_location(div8, file$8, 10, 0, 315);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div6);
    			append_dev(div6, img);
    			append_dev(div6, t0);
    			append_dev(div6, div0);
    			append_dev(div0, b);
    			append_dev(b, t1);
    			append_dev(div6, t2);
    			append_dev(div6, div5);
    			append_dev(div5, div2);
    			append_dev(div2, div1);
    			mount_component(mdaccesstime, div1, null);
    			append_dev(div2, t3);
    			append_dev(div2, t4);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, div3);
    			mount_component(mdalarm, div3, null);
    			append_dev(div4, t6);
    			append_dev(div4, t7);
    			append_dev(div8, t8);
    			append_dev(div8, div7);
    			div7.innerHTML = raw_value;
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if ((!current || changed.item) && img_src_value !== (img_src_value = ctx.item.icon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((!current || changed.item) && t1_value !== (t1_value = ctx.item.label + "")) {
    				set_data_dev(t1, t1_value);
    			}

    			if ((!current || changed.item) && t4_value !== (t4_value = ctx.item.date.start + "")) {
    				set_data_dev(t4, t4_value);
    			}

    			if ((!current || changed.item) && t7_value !== (t7_value = ctx.item.date.end + "")) {
    				set_data_dev(t7, t7_value);
    			}

    			if ((!current || changed.item) && raw_value !== (raw_value = ctx.item.description + "")) {
    				div7.innerHTML = raw_value;
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			transition_in(mdaccesstime.$$.fragment, local);

    			transition_in(mdalarm.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(mdaccesstime.$$.fragment, local);
    			transition_out(mdalarm.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div8);
    			}

    			destroy_component(mdaccesstime);

    			destroy_component(mdalarm);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$8.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	
        let item;
        navigation.subscribe(({cat, selected}) => {
            $$invalidate('item', item = content[cat][selected]);
        });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('item' in $$props) $$invalidate('item', item = $$props.item);
    	};

    	return { item };
    }

    class Description extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Description", options, id: create_fragment$8.name });
    	}
    }

    /* src/crafting/Links.svelte generated by Svelte v3.12.1 */

    const file$9 = "src/crafting/Links.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.icon = list[i].icon;
    	child_ctx.url = list[i].url;
    	return child_ctx;
    }

    // (14:8) {#each links as {icon, url}}
    function create_each_block$1(ctx) {
    	var a, img, img_src_value, t, a_href_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			img = element("img");
    			t = space();
    			attr_dev(img, "src", img_src_value = ctx.icon);
    			attr_dev(img, "alt", 'link');
    			attr_dev(img, "class", "svelte-x292qc");
    			add_location(img, file$9, 15, 16, 389);
    			attr_dev(a, "class", "item svelte-x292qc");
    			attr_dev(a, "href", a_href_value = ctx.url);
    			attr_dev(a, "target", "_blank");
    			add_location(a, file$9, 14, 12, 329);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, img);
    			append_dev(a, t);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.links) && img_src_value !== (img_src_value = ctx.icon)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if ((changed.links) && a_href_value !== (a_href_value = ctx.url)) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(a);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$1.name, type: "each", source: "(14:8) {#each links as {icon, url}}", ctx });
    	return block;
    }

    function create_fragment$9(ctx) {
    	var div2, div0, b, t_1, div1;

    	let each_value = ctx.links;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			b = element("b");
    			b.textContent = "LINKS";
    			t_1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			add_location(b, file$9, 11, 20, 240);
    			attr_dev(div0, "id", "title");
    			attr_dev(div0, "class", "svelte-x292qc");
    			add_location(div0, file$9, 11, 4, 224);
    			attr_dev(div1, "id", "links");
    			attr_dev(div1, "class", "svelte-x292qc");
    			add_location(div1, file$9, 12, 4, 263);
    			attr_dev(div2, "id", "wrapper");
    			attr_dev(div2, "class", "svelte-x292qc");
    			add_location(div2, file$9, 10, 0, 201);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, b);
    			append_dev(div2, t_1);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if (changed.links) {
    				each_value = ctx.links;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div2);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$9.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let links;
        navigation.subscribe(({cat, selected}) => {
            $$invalidate('links', links = content[cat][selected].links);
        });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('links' in $$props) $$invalidate('links', links = $$props.links);
    	};

    	return { links };
    }

    class Links extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Links", options, id: create_fragment$9.name });
    	}
    }

    /* src/crafting/Stats.svelte generated by Svelte v3.12.1 */

    const file$a = "src/crafting/Stats.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.label = list[i].label;
    	child_ctx.count = list[i].count;
    	return child_ctx;
    }

    // (15:4) {#each stats as {label, count}}
    function create_each_block$2(ctx) {
    	var div2, div0, t0_value = ctx.count + "", t0, t1, div1, t2_value = ctx.label + "", t2, t3;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(div0, "class", "svelte-qknakh");
    			add_location(div0, file$a, 16, 12, 388);
    			attr_dev(div1, "class", "svelte-qknakh");
    			add_location(div1, file$a, 17, 12, 419);
    			attr_dev(div2, "class", "item svelte-qknakh");
    			add_location(div2, file$a, 15, 8, 357);
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    			append_dev(div2, t3);
    		},

    		p: function update(changed, ctx) {
    			if ((changed.stats) && t0_value !== (t0_value = ctx.count + "")) {
    				set_data_dev(t0, t0_value);
    			}

    			if ((changed.stats) && t2_value !== (t2_value = ctx.label + "")) {
    				set_data_dev(t2, t2_value);
    			}
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div2);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_each_block$2.name, type: "each", source: "(15:4) {#each stats as {label, count}}", ctx });
    	return block;
    }

    function create_fragment$a(ctx) {
    	var div3, div2, div0, t1, div1, t3;

    	let each_value = ctx.stats;

    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			div0.textContent = "AMOUNT";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "SKILL";
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}
    			attr_dev(div0, "class", "svelte-qknakh");
    			add_location(div0, file$a, 11, 8, 259);
    			attr_dev(div1, "class", "svelte-qknakh");
    			add_location(div1, file$a, 12, 8, 285);
    			attr_dev(div2, "id", "header");
    			attr_dev(div2, "class", "item svelte-qknakh");
    			add_location(div2, file$a, 10, 4, 220);
    			attr_dev(div3, "id", "wrapper");
    			attr_dev(div3, "class", "svelte-qknakh");
    			add_location(div3, file$a, 9, 0, 197);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div3, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div3, null);
    			}
    		},

    		p: function update(changed, ctx) {
    			if (changed.stats) {
    				each_value = ctx.stats;

    				let i;
    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(changed, child_ctx);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div3, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}
    				each_blocks.length = each_value.length;
    			}
    		},

    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div3);
    			}

    			destroy_each(each_blocks, detaching);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$a.name, type: "component", source: "", ctx });
    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let stats;
        navigation.subscribe(({cat, selected}) => {
            $$invalidate('stats', stats = content[cat][selected].stats);
        });

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ('stats' in $$props) $$invalidate('stats', stats = $$props.stats);
    	};

    	return { stats };
    }

    class Stats extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Stats", options, id: create_fragment$a.name });
    	}
    }

    /* src/crafting/Crafting.svelte generated by Svelte v3.12.1 */

    const file$b = "src/crafting/Crafting.svelte";

    function create_fragment$b(ctx) {
    	var div7, div6, div0, t0, div1, t1, div2, t2, div3, t3, div4, t4, div5, current;

    	var categories = new Categories({ $$inline: true });

    	var list = new List({ $$inline: true });

    	var description = new Description({ $$inline: true });

    	var links = new Links({ $$inline: true });

    	var stats = new Stats({ $$inline: true });

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div6 = element("div");
    			div0 = element("div");
    			categories.$$.fragment.c();
    			t0 = space();
    			div1 = element("div");
    			list.$$.fragment.c();
    			t1 = space();
    			div2 = element("div");
    			description.$$.fragment.c();
    			t2 = space();
    			div3 = element("div");
    			t3 = space();
    			div4 = element("div");
    			links.$$.fragment.c();
    			t4 = space();
    			div5 = element("div");
    			stats.$$.fragment.c();
    			attr_dev(div0, "id", "categories");
    			attr_dev(div0, "class", "svelte-g8b0st");
    			add_location(div0, file$b, 11, 8, 346);
    			attr_dev(div1, "id", "list");
    			attr_dev(div1, "class", "svelte-g8b0st");
    			add_location(div1, file$b, 14, 8, 418);
    			attr_dev(div2, "id", "description");
    			attr_dev(div2, "class", "svelte-g8b0st");
    			add_location(div2, file$b, 17, 8, 478);
    			attr_dev(div3, "id", "queue");
    			attr_dev(div3, "class", "svelte-g8b0st");
    			add_location(div3, file$b, 20, 8, 552);
    			attr_dev(div4, "id", "links");
    			attr_dev(div4, "class", "svelte-g8b0st");
    			add_location(div4, file$b, 21, 8, 583);
    			attr_dev(div5, "id", "stats");
    			attr_dev(div5, "class", "svelte-g8b0st");
    			add_location(div5, file$b, 24, 8, 645);
    			attr_dev(div6, "id", "content");
    			attr_dev(div6, "class", "svelte-g8b0st");
    			add_location(div6, file$b, 10, 4, 319);
    			attr_dev(div7, "id", "wrapper");
    			attr_dev(div7, "class", "svelte-g8b0st");
    			add_location(div7, file$b, 9, 0, 296);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div6);
    			append_dev(div6, div0);
    			mount_component(categories, div0, null);
    			append_dev(div6, t0);
    			append_dev(div6, div1);
    			mount_component(list, div1, null);
    			append_dev(div6, t1);
    			append_dev(div6, div2);
    			mount_component(description, div2, null);
    			append_dev(div6, t2);
    			append_dev(div6, div3);
    			append_dev(div6, t3);
    			append_dev(div6, div4);
    			mount_component(links, div4, null);
    			append_dev(div6, t4);
    			append_dev(div6, div5);
    			mount_component(stats, div5, null);
    			current = true;
    		},

    		p: noop,

    		i: function intro(local) {
    			if (current) return;
    			transition_in(categories.$$.fragment, local);

    			transition_in(list.$$.fragment, local);

    			transition_in(description.$$.fragment, local);

    			transition_in(links.$$.fragment, local);

    			transition_in(stats.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			transition_out(categories.$$.fragment, local);
    			transition_out(list.$$.fragment, local);
    			transition_out(description.$$.fragment, local);
    			transition_out(links.$$.fragment, local);
    			transition_out(stats.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div7);
    			}

    			destroy_component(categories);

    			destroy_component(list);

    			destroy_component(description);

    			destroy_component(links);

    			destroy_component(stats);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$b.name, type: "component", source: "", ctx });
    	return block;
    }

    class Crafting extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$b, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Crafting", options, id: create_fragment$b.name });
    	}
    }

    /* src/Equipped.svelte generated by Svelte v3.12.1 */

    const file$c = "src/Equipped.svelte";

    function create_fragment$c(ctx) {
    	var div, a0, img0, t0, a1, img1, t1, a2, img2, t2, a3, img3, t3, a4, img4, t4, a5, img5;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a0 = element("a");
    			img0 = element("img");
    			t0 = space();
    			a1 = element("a");
    			img1 = element("img");
    			t1 = space();
    			a2 = element("a");
    			img2 = element("img");
    			t2 = space();
    			a3 = element("a");
    			img3 = element("img");
    			t3 = space();
    			a4 = element("a");
    			img4 = element("img");
    			t4 = space();
    			a5 = element("a");
    			img5 = element("img");
    			attr_dev(img0, "src", "images/rock.png");
    			attr_dev(img0, "alt", "rock");
    			attr_dev(img0, "class", "svelte-euy2n5");
    			add_location(img0, file$c, 7, 8, 249);
    			attr_dev(a0, "class", "item svelte-euy2n5");
    			attr_dev(a0, "href", "https://www.youtube.com/watch?v=z9Uz1icjwrM");
    			add_location(a0, file$c, 6, 4, 173);
    			attr_dev(img1, "src", "images/github3d.png");
    			attr_dev(img1, "alt", "github");
    			attr_dev(img1, "class", "svelte-euy2n5");
    			add_location(img1, file$c, 10, 8, 363);
    			attr_dev(a1, "class", "item svelte-euy2n5");
    			attr_dev(a1, "href", "https://github.com/misterdev");
    			add_location(a1, file$c, 9, 4, 302);
    			attr_dev(img2, "src", "images/twitter3d2.png");
    			attr_dev(img2, "alt", "twitter");
    			attr_dev(img2, "class", "svelte-euy2n5");
    			add_location(img2, file$c, 13, 8, 485);
    			attr_dev(a2, "class", "item svelte-euy2n5");
    			attr_dev(a2, "href", "https://twitter.com/misterdev_");
    			add_location(a2, file$c, 12, 4, 422);
    			attr_dev(img3, "src", "images/linkedin3d.png");
    			attr_dev(img3, "alt", "linkedin");
    			attr_dev(img3, "class", "svelte-euy2n5");
    			add_location(img3, file$c, 16, 8, 618);
    			attr_dev(a3, "class", "item svelte-euy2n5");
    			attr_dev(a3, "href", "https://www.linkedin.com/in/misterdev/");
    			add_location(a3, file$c, 15, 4, 547);
    			attr_dev(img4, "src", "images/stack3d.png");
    			attr_dev(img4, "alt", "stackoverflow");
    			attr_dev(img4, "class", "svelte-euy2n5");
    			add_location(img4, file$c, 19, 8, 769);
    			attr_dev(a4, "class", "item svelte-euy2n5");
    			attr_dev(a4, "href", "https://stackoverflow.com/users/4695325/devid-farinelli");
    			add_location(a4, file$c, 18, 4, 681);
    			attr_dev(img5, "src", "images/envelope3d.png");
    			attr_dev(img5, "alt", "e-mail");
    			attr_dev(img5, "class", "svelte-euy2n5");
    			add_location(img5, file$c, 22, 8, 899);
    			attr_dev(a5, "class", "item svelte-euy2n5");
    			attr_dev(a5, "href", "mailto:devid.farinelli@gmail.com");
    			add_location(a5, file$c, 21, 4, 834);
    			attr_dev(div, "id", "wrapper");
    			attr_dev(div, "class", "svelte-euy2n5");
    			add_location(div, file$c, 5, 0, 150);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a0);
    			append_dev(a0, img0);
    			append_dev(div, t0);
    			append_dev(div, a1);
    			append_dev(a1, img1);
    			append_dev(div, t1);
    			append_dev(div, a2);
    			append_dev(a2, img2);
    			append_dev(div, t2);
    			append_dev(div, a3);
    			append_dev(a3, img3);
    			append_dev(div, t3);
    			append_dev(div, a4);
    			append_dev(a4, img4);
    			append_dev(div, t4);
    			append_dev(div, a5);
    			append_dev(a5, img5);
    		},

    		p: noop,
    		i: noop,
    		o: noop,

    		d: function destroy(detaching) {
    			if (detaching) {
    				detach_dev(div);
    			}
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$c.name, type: "component", source: "", ctx });
    	return block;
    }

    class Equipped extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, null, create_fragment$c, safe_not_equal, []);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "Equipped", options, id: create_fragment$c.name });
    	}
    }

    /* src/App.svelte generated by Svelte v3.12.1 */

    const file$d = "src/App.svelte";

    function create_fragment$d(ctx) {
    	var link, t0, div2, video, t1, div1, t2, div0, current;

    	var switch_value = ctx.selected;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		var switch_instance = new switch_value(switch_props());
    	}

    	var equipped = new Equipped({ $$inline: true });

    	const block = {
    		c: function create() {
    			link = element("link");
    			t0 = space();
    			div2 = element("div");
    			video = element("video");
    			t1 = space();
    			div1 = element("div");
    			if (switch_instance) switch_instance.$$.fragment.c();
    			t2 = space();
    			div0 = element("div");
    			equipped.$$.fragment.c();
    			attr_dev(link, "href", "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");
    			attr_dev(link, "rel", "stylesheet");
    			add_location(link, file$d, 12, 1, 700);
    			attr_dev(video, "src", src);
    			attr_dev(video, "poster", img);
    			video.muted = true;
    			attr_dev(video, "class", "svelte-11iuows");
    			add_location(video, file$d, 15, 1, 837);
    			attr_dev(div0, "id", "footer");
    			attr_dev(div0, "class", "svelte-11iuows");
    			add_location(div0, file$d, 18, 2, 932);
    			attr_dev(div1, "id", "content");
    			attr_dev(div1, "class", "svelte-11iuows");
    			add_location(div1, file$d, 16, 1, 872);
    			attr_dev(div2, "class", "wrapper svelte-11iuows");
    			add_location(div2, file$d, 14, 0, 814);
    		},

    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},

    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div2, anchor);
    			append_dev(div2, video);
    			append_dev(div2, t1);
    			append_dev(div2, div1);

    			if (switch_instance) {
    				mount_component(switch_instance, div1, null);
    			}

    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			mount_component(equipped, div0, null);
    			current = true;
    		},

    		p: function update(changed, ctx) {
    			if (switch_value !== (switch_value = ctx.selected)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;
    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});
    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());

    					switch_instance.$$.fragment.c();
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div1, t2);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},

    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);

    			transition_in(equipped.$$.fragment, local);

    			current = true;
    		},

    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			transition_out(equipped.$$.fragment, local);
    			current = false;
    		},

    		d: function destroy(detaching) {
    			detach_dev(link);

    			if (detaching) {
    				detach_dev(t0);
    				detach_dev(div2);
    			}

    			if (switch_instance) destroy_component(switch_instance);

    			destroy_component(equipped);
    		}
    	};
    	dispatch_dev("SvelteRegisterBlock", { block, id: create_fragment$d.name, type: "component", source: "", ctx });
    	return block;
    }

    let src = 'https://sveltejs.github.io/assets/caminandes-llamigos.mp4';

    let img = 'https://static.gamespot.com/uploads/original/1406/14063904/3353523-20180211195717_1.jpg';

    function instance$b($$self, $$props, $$invalidate) {
    	
    	let { name } = $$props;
    	let selected = Crafting;

    	const writable_props = ['name'];
    	Object.keys($$props).forEach(key => {
    		if (!writable_props.includes(key) && !key.startsWith('$$')) console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$set = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    	};

    	$$self.$capture_state = () => {
    		return { name, src, img, selected };
    	};

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate('name', name = $$props.name);
    		if ('src' in $$props) $$invalidate('src', src = $$props.src);
    		if ('img' in $$props) $$invalidate('img', img = $$props.img);
    		if ('selected' in $$props) $$invalidate('selected', selected = $$props.selected);
    	};

    	return { name, selected };
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$b, create_fragment$d, safe_not_equal, ["name"]);
    		dispatch_dev("SvelteRegisterComponent", { component: this, tagName: "App", options, id: create_fragment$d.name });

    		const { ctx } = this.$$;
    		const props = options.props || {};
    		if (ctx.name === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
