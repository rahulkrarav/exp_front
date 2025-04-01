import React from 'react';
import { Progress } from 'antd';

const Analytics = ({ alltransaction }) => {
  const totalTransaction = alltransaction.length;
  const totalIncomeTransaction = alltransaction.filter(transaction => transaction.type === 'income').length;
  const totalExpenseTransaction = alltransaction.filter(transaction => transaction.type === 'expense').length;

  const totalIncomePercent = (totalIncomeTransaction / totalTransaction) * 100;
  const totalExpensePercent = (totalExpenseTransaction / totalTransaction) * 100;


  //total turnover
const totalTurnover = alltransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
const totalIncomeTurnover = alltransaction.filter(transaction => transaction.type === 'income').reduce((acc, transaction) => acc + transaction.amount, 0);
const totalExpenseTurnover = alltransaction.filter(transaction => transaction.type === 'expense').reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercent = (totalIncomeTurnover / totalTurnover) * 100;
    const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;
  return (
    <>
      <div className='row m-3'>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
              Total Transactions: {totalTransaction}
            </div>
            <div className='card-body'>
              <h5 className='text-success'>Income: {totalIncomeTransaction}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTransaction}</h5>
              <div>
                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomePercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpensePercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row m-3'>
        <div className='col-md-4'>
          <div className='card'>
            <div className='card-header'>
              Total Turnover: {totalTurnover}
            </div>
            <div className='card-body'>
              <h5 className='text-success'>Income: {totalIncomeTurnover}</h5>
              <h5 className='text-danger'>Expense: {totalExpenseTurnover}</h5>
              <div>
                <Progress type='circle' strokeColor={'green'} className='mx-2' percent={totalIncomeTurnoverPercent.toFixed(0)} />
                <Progress type='circle' strokeColor={'red'} className='mx-2' percent={totalExpenseTurnoverPercent.toFixed(0)} />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Analytics;
