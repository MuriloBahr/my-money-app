import axios from "axios";
import { toastr } from "react-redux-toastr";
import { reset as resetForm, initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabAction'

const BASE_URL = 'http://localhost:3001/api'
const INITIAL_VALUES = {credits: [{}], debts: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/bilingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){
    return submit(values, 'post')
}

export function update(values){
    return submit(values, 'put')
}

export function remove(values){
    return submit(values, 'delete')
}

function submit(values, method){
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/bilingCycles/${id}`, values)
            .then(()=>{
                toastr.success('Sucesso', 'Operacao realizada com sucesso!')
                dispatch(init()) 
            })
            .catch(e => {
                e.response.data.errors.forEach(() => toastr.error('Erro', 'Preencha todas as caixas com os valores: NOME, MES, ANO'))
            })
    }
}

export function showUpdate(billingCycle){
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(bilingCycles){
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', bilingCycles)
    ]
}

export function init(){
    return [
        showTabs('tablist', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}