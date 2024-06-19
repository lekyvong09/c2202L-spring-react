import { useDispatch, useSelector } from 'react-redux';
import styles from './Counter.module.css';
import { decrement, increment, incrementAsync, incrementByNumber } from './counterSlice';
import { store } from '../store';
import { useState } from 'react';

export default function Counter() {
    const count = useSelector((state: any) => state.counter.value);
    const dispatch = useDispatch<typeof store.dispatch>();

    const [incrementAmount, setIncrementAmount] = useState('2');
    const incrementValue = Number(incrementAmount) || 0;

    return (
        <>
            <div className={styles.row}>
                <button
                    className={styles.button}
                    aria-label='Decrement Value'
                    onClick={() => dispatch(decrement())}
                >
                    -
                </button>
                <span className={styles.value}>{count}</span>
                <button
                    className={styles.button}
                    aria-label='Decrement Value'
                    onClick={() => dispatch(increment())}
                >
                    +
                </button>
            </div>

            <div className={styles.row}>
                <input 
                    className={styles.textbox}
                    onChange={(e) => setIncrementAmount(e.target.value)}
                    value={incrementAmount}
                />
                <button
                    className={styles.button}
                    onClick={() => dispatch(incrementByNumber(incrementValue))}
                >
                    Add Amount
                </button>
                <button
                    className={styles.asyncButton}
                    onClick={() => dispatch(incrementAsync(incrementValue))}
                >
                    Add Async
                </button>
            </div>
        </>
    );
}