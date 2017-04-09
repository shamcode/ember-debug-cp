import Ember from 'ember';

/* eslint no-console: ["error", { allow: ["debug", "group", "dir", "groupEnd"] }] */
/* eslint-disable no-debugger */

const {
          computed
      } = Ember;

/**
 * Print header/footer for key
 * @private
 * @param {String} key
 * @param {Boolean} isOpen
 */
function printTable( key, isOpen ) {
    let line = isOpen ? '┌' : '└';
    const length = 38 + key.length;
    for ( let i = 0; i < length; i++ ) {
        line += '─';
    }
    line += isOpen ? '┐' : '┘';
    console.debug( line );
}

/**
 * Wrap callback with getter debug
 * @private
 * @param {Array.<String>} dependents
 * @param {Function} callback
 * @return {Function}
 */
function getterDebug( dependents, callback ) {
    return function( key ) {

        // Log key & dependents
        printTable( key, true );
        console.debug( `│ \tDebug get computed property '${key}'     │` );
        printTable( key, false );
        console.group( key );
        console.group( 'Dependents:' );
        console.dir( dependents );
        console.groupEnd();

        // Debug before
        debugger;

        // Resolve computed
        const result = callback.apply( this, arguments );

        // Log expanded result
        console.group( 'Result:' );
        console.dir( result );
        console.groupEnd();

        console.groupEnd();

        // Debug after
        debugger;

        printTable( key, true );
        console.debug( `│ \tEnd Debug get computed property '${key}' │` );
        printTable( key, false );

        // Return original result
        return result;
    };
}

/**
 * Get setter debug
 * @private
 * @param {Array.<String>} dependents
 * @return {Function}
 */
function setterDebug( dependents ) {
    return function( key, value ) {
        printTable( key, true );
        console.debug( `│ \tDebug set computed property '${key}'     │` );
        printTable( key, false );
        console.group( key );
        console.group( 'Dependents:' );
        console.dir( dependents );
        console.groupEnd();

        console.group( 'New value:' );
        console.dir( value );
        console.groupEnd();

        console.groupEnd();
        printTable( key, true );
        console.debug( `│ \tEnd Debug set computed property '${key}' │` );
        printTable( key, false );

        // Debug for analyze stacktrace
        debugger;

        return value;
    };
}

/**
 * Collection of wrappers for debug computed
 */
export default class DebugProperty {

    /**
     * Wrapper for debug get computed callback
     * @example { foo: DebugProperty.get( 'bar', function() { return this.get( 'bar' ); } ) }
     * @param rest
     * @return {Ember.ComputedProperty}
     */
    static get( ...rest ) {
        const callback = rest[ rest.length - 1 ],
              dependents = rest.slice( 0, rest.length - 1 );
        return computed(
            ...dependents.concat(
                getterDebug( dependents, callback )
            )
        );
    }

    /**
     * Wrapper for debug modification computed value
     * @example { foo: DebugProperty.set( 'bar', function() { return this.get( 'bar' ); } ) }
     * @param rest
     * @return {Ember.ComputedProperty}
     */
    static set( ...rest ) {
        const callback = rest[ rest.length - 1 ],
              dependents = rest.slice( 0, rest.length - 1 );
        return computed( ...dependents.concat( {
            get: callback,
            set: setterDebug( dependents )
        } ) );
    }

    /**
     * Alias for DebugProperty.set
     * @example { foo: DebugProperty.modify( 'bar', function() { return this.get( 'bar' ); } ) }
     * @param rest
     * @return {Ember.ComputedProperty}
     */
    static modify( ...rest ) {
        return DebugProperty.set( ...rest );
    }

    /**
     * Wrapper for debug get computed callback & modification computed value
     * @example { foo: DebugProperty.both( 'bar', function() { return this.get( 'bar' ); } ) }
     * @param rest
     * @return {Ember.ComputedProperty}
     */
    static both( ...rest ) {
        const callback = rest[ rest.length - 1 ],
              dependents = rest.slice( 0, rest.length - 1 );
        return computed( ...dependents.concat( {
            get: getterDebug( dependents, callback ),
            set: setterDebug( dependents )
        } ) );
    }
}
