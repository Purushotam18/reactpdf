import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var rowDel = this.props.onRowDel;
    var totalprice = 1;
    
    var itemTable = this.props.items.map(function(item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} currency={currency}/>
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM&nbsp;NAME</th>
              <th>ITEM&nbsp;DESCRIPTION</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th>TOTAL</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  handleChangeItemTotal() {
    // console.log(this.props.item.price);
    // console.log(this.props.item.quantity);
  }
  render() {
    return (
      <tr>
        <td style={{width: '50%'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/>
        </td>  
        <td>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: this.props.item.description,
            id: this.props.item.id
          }}/>
        </td>
        <td style={{minWidth: '70px'}}>
          <EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          onChange={this.handleChangeItemTotal()}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: this.props.item.quantity,
            id: this.props.item.id,
          }}/>
        </td>
        <td style={{minWidth: '130px'}}>
          <EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          onChange={this.handleChangeItemTotal()}
            cellData={{
            leading: this.props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.price,
            id: this.props.item.id,
          }}/>
        </td>
        <td style={{minWidth: '120px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            leading: this.props.currency,
            name: "itemtotal",
            min: 1,
            step: "0.01",
            presicion: 2,
            disable:true,
            textAlign: "text-end",
            value: this.props.item.itemTotal,
            id: this.props.item.id,
          }}/>
        </td>
        <td className="text-center" style={{minWidth: '50px'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;