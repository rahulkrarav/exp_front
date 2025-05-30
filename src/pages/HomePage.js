import React,{useState, useEffect} from 'react';
import {Input, Modal, Form, Select, message, Table, DatePicker} from 'antd';
import {UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons";
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import Spinner from "../components/Spinner";
import moment from 'moment';
import Analytics from '../components/Analytics';
// import { set } from 'mongoose';
const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal,setShowModal]= useState(false);
  const [loading,setLoading]= useState(false);
  const [alltransaction, setAllTransaction] = useState([]);
  const [frequency, setFrequency] = useState('7');
  const [selectedDate, setSelectedDate] = useState([]);
  const [type,setType]= useState('all');
  const [viewData,setViewData]= useState('table');
  const [editable,setEditable]= useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Catagory",
      dataIndex: "catagory",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (_text,record) => (
        <div>
          <EditOutlined onClick={() => {
            setEditable(record);
            setShowModal(true);
            }}  />
          <DeleteOutlined className="mx-2" onClick={() => {handleDelete(record)}}/>
        </div>
      )
    },
  ];
  //get all transactions
  

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post('https://exp-backend-01.onrender.com/api/v1/transactions/get-transaction', {userid: user._id,frequency,selectedDate,type});
        setLoading(false);
        setAllTransaction(res.data);
        console.log(res.data)
      } catch (error) {
        console.log(error);
        message.error("Failed to load transactions")
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type]);

  //delete handler
  const handleDelete = async (record) => {
    try{
      setLoading(true)
      await axios.post("https://exp-backend-01.onrender.com/api/v1/transactions/delete-transaction", {transactionId:record._id})
        setLoading(false)
        message.success('Transaction Deleted!')
    }catch (error) {
      setLoading(false)
      console.log(error)
      message.error('Unable to delete!')
    }
  }

  //form handling
  const handleSubmit =async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if(editable){
        await axios.post('https://exp-backend-01.onrender.com/api/v1/transactions/edit-transaction', {payload:{...values, userId: user._id},transactionId: editable._id});
        setLoading(false);
        message.success("Transaction updated successfully")
      }else{
        await axios.post('https://exp-backend-01.onrender.com/api/v1/transactions/add-transaction', {...values, userid: user._id,});
      setLoading(false);
      message.success("Transaction added successfully")
      }
      setShowModal(false);
      setEditable(null);
  } catch (error) {
      setLoading(false);
      message.error("Failed to add")
    }
  };

  return (
    <Layout>
      {loading && <Spinner />}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value)}>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30" >Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">Custom</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)} />} 
        </div>
        
        <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">All</Select.Option>
            <Select.Option value="income" >Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
          </Select>
          {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values)=>setSelectedDate(values)} />} 
        </div>
        <div className='switch-icons'>
          <UnorderedListOutlined 
          className= {`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`}
           onClick={() => setViewData('table')}/>
          <AreaChartOutlined 
          className= {`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`}
           onClick={() => setViewData('analytics')}/>
          </div>

        
            
          <div>
          <button className='btn btn-primary' onClick={()=>setShowModal(true)}>ADD NEW</button>
          </div>
        
      </div>
      <div className='content'>
        {viewData === 'table' ?
        <Table columns={columns} dataSource={alltransaction} />
        : <Analytics alltransaction={alltransaction} />}
      </div>
      <Modal title={editable ? "Edit Transaction" : "Add Transaction"}
      open={showModal} 
        onCancel={()=>setShowModal(false)}
        footer={false}>
        
        <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
          <Form.Item label="Amount" name="amount">
          <Input type="text" />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
            <Select.Option value="income">Income</Select.Option>
            <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Catagory" name="catagory">
            <Select>
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="tip">Tip</Select.Option>
            <Select.Option value="project">Project</Select.Option>
            <Select.Option value="food">Food</Select.Option>
            <Select.Option value="movie">Movie</Select.Option>
            <Select.Option value="travel">Travel</Select.Option>
            <Select.Option value="shopping">Shopping</Select.Option>
            <Select.Option value="bills">Bills</Select.Option>
            <Select.Option value="medical">Medical Treatrment</Select.Option>
            <Select.Option value="fee">Fees</Select.Option>
            <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name={"date"}>
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name={"refrence"}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name={"description"}>
            <Input type="text" />
          </Form.Item> 
          <div className='d-flex justify-content-end'>
          <button className='btn btn-primary' type="submit">SAVE</button>
          </div>
        </Form>

      </Modal >
    </Layout>
  );
};

export default HomePage;