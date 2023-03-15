import { Button, Input, Tag } from 'antd';
import adminApi from 'api/adminApi';
import shiperApi from 'api/shiperApi';

import { statusOrder } from 'constant';
import { statusShiper } from 'constant/statusShiper';
import AdminTable from 'features/Admin/common/AdminTable';
// import { adminLogout } from 'features/Admin/adminSlice';

import moment from 'moment';
import React, { Fragment, useEffect, useState } from 'react';

// import { useDispatch } from 'react-redux';


function ShiperOrderAdmin() {
  const [orderList, setOrderList] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.managerShiper();
     
      
    
      
      if (res.status === 200 && res.success) { 
        res.data && mapData(res.data);
        res.data && setOrderData(res.data);
      }
    } catch (error) {
      // dispatch(adminLogout());
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const mapData = (data) => {


    if (data && data.length === 0) return;
    const mapOrderList = data.map((item) => {
     
      const order = {
        id: item.userOrder[0].id,
        userName: item.userOrder[0].shiper.name,
        userPhone: item.userOrder[0].shiper.numberPhone,
        address:
        item.userOrder[0].address1.street_name +
          ', ' +
          item.userOrder[0].address1.ward +
          ', ' +
          item.userOrder[0].address1.district +
          ', ' +
          item.userOrder[0].address1.province,
         date_order: item.userOrder[0].updatedAt,
        count: item.userOrder[1].order_detail.reduce(
          (acc, i) => acc + i.product_quantity,
          0
        ),
        nameProductTags:item.userOrder[1].order_detail.map(
          (item) =>  {
            
            // console.log(item.product);
            return item?.product1?.name + ' (x' + item?.product_quantity + ')';
          }
        ),
        total: item.userOrder[0].total,
        status: item.userOrder[0].status,
      };
      
      return order;}
    );
    setOrderList(mapOrderList);
  };

  const searchFilterDropdown = (dataIndex) => {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => {
        return (
          <div style={{ padding: 8, width: '450px', display: 'flex' }}>
            <Input
              value={selectedKeys[0]}
              onChange={(e) => {
                return setSelectedKeys(
                  e.target.value ? [e.target.value] : ['']
                );
              }}
              onPressEnter={() => {
                confirm({ closeDropdown: false });
              }}
            />
            <Button
              onClick={() => {
                confirm({ closeDropdown: false });
              }}
            >
              Tìm Kiếm
            </Button>
            <Button
              onClick={() => {
                clearFilters();
              }}
            >
              Reset
            </Button>
          </div>
        );
      },
      onFilter: (value, record) => {
        return record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : '';
      },
    };
  };

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      width: 70,
    },
    {
      title: 'Tên Shiper',
      dataIndex: 'userName',
      key: 'userName',
      ...searchFilterDropdown('userName'),
      width: 250,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'userPhone',
      key: 'userPhone',
      ...searchFilterDropdown('userPhone'),
      width: 150,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      ...searchFilterDropdown('address'),
      width: 300,
    },
    {
      title: 'Thời gian',
      dataIndex: 'date_order',
      key: 'date_order',
      sorter: (a, b) => {
        return a.date_order - b.date_order;
      },
      render: (date) => {
        const _date = [
          moment(date).format('DD-MM-YYYY hh:mm:ss')
        ];
        return (
          <Fragment>
            <p style={{ textAlign: 'center' }}>{_date[0]}</p>
           
          </Fragment>
        );
      },
      width: 100,
    },
    {
      title: 'Sản phẩm',
      key: 'nameProductTags',
      dataIndex: 'nameProductTags',
      render: (tags) => (
        <Fragment>
          {tags.map((tag) => {
            return (
              <Tag style={{ marginBottom: '5px' }} color={'green'} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </Fragment>
      ),
      ...searchFilterDropdown('nameProductTags'),
      width: 220,
    },
    {
      title: 'Số lượng',
      dataIndex: 'count',
      key: 'count',
      sorter: (a, b) => a.count - b.count,
      width: 120,
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      dataIndex: 'total',
      sorter: (a, b) => a.total - b.total,
      render: (total) =>
        total.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        }),
      width: 210,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      dataIndex: 'status',
      render: (status) =>
      status ===4
      ? statusOrder.TRANSPORT
        :status ===6
          ? statusShiper.RECEVIE
          : status === 7
          ? statusShiper.DELIVERY
          : status === 8
          ? statusShiper.COMPLETED
         
          
          : '',
      filters: [
        {
          text: statusShiper.RECEVIE,
          value: 6,
        },
        {
          text: statusShiper.DELIVERY,
          value: 7,
        },
        {
          text: statusShiper.COMPLETED,
          value: 8,
        },
       
      ],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => {
        return record.status === value;
      },
      width: 100,
    },
    // {
    //   title: 'Chi tiết',
    //   key: 'action',
    //   render: (i) => {
    //     const data = orderData.find((item) => item.userOrder[0].id === i.id);
       
      
    //     // return <EditOrder data={data} onEdit={fetchData} />;
    //   },
    //   width: 150,
    // },
    
  ];

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='admin-order'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        <div
          style={{
            height: '40px',
            textAlign: 'center',
            fontSize: '19px',
            color: '#505050',
            float: 'left',
          }}
        >
          Đơn hàng
        </div>
        <Button onClick={() => fetchData()} style={{ marginRight: '10px' }}>
          <i className='fas fa-sync'></i>
        </Button>
       
      </div>
      <AdminTable
        limit={7}
        loading={loading}
        columns={columns}
        data={orderList}
      />
    </div>
  );
}

export default ShiperOrderAdmin;
