import { getUser, refreshToken } from "./actions"

export const getNSetUser = async () => {
    if (localStorage.getItem('access')) {
        const getResponse = await getUser(localStorage.getItem('access'))
        if (getResponse.status === 200) {
            return {
                name: getResponse.data.full_name,
                email: getResponse.data.email,
                admin: getResponse.data.superuser,
                status: getStatuses(getResponse.data.status),
                photo: getResponse.data.photo,
            }
        }
        else {
            const refreshResponse = await refreshToken(localStorage.getItem('refresh'))
            if (refreshResponse.status === 200) {
                localStorage.setItem('refresh', refreshResponse.data.refresh_token)
                localStorage.setItem('access', refreshResponse.data.access_token)
                const getResponse2 = await getUser(localStorage.getItem('access'))
                return {
                    name: getResponse2.data.full_name,
                    email: getResponse2.data.email,
                    admin: getResponse2.data.superuser,
                    status: getStatuses(getResponse2.data.status),
                    photo: getResponse2.data.photo
                }
            }
        }
    }
}

export const getStatuses = (list, reverse = false) => {
    const defaultStatuses = {
        "is_competent_in_payment_issue": false,
        "is_competent_in_create_account": false,
        "is_competent_in_contact_customer_service": false,
        "is_competent_in_get_invoice": false,
        "is_competent_in_track_order": false,
        "is_competent_in_get_refund": false,
        "is_competent_in_contact_human_agent": false,
        "is_competent_in_recover_password": false,
        "is_competent_in_change_order": false,
        "is_competent_in_delete_account": false,
        "is_competent_in_complaint": false,
        "is_competent_in_check_invoices": false,
        "is_competent_in_review": false,
        "is_competent_in_check_refund_policy": false,
        "is_competent_in_delivery_options": false,
        "is_competent_in_check_cancellation_fee": false,
        "is_competent_in_track_refund": false,
        "is_competent_in_check_payment_methods": false,
        "is_competent_in_switch_account": false,
        "is_competent_in_newsletter_subscription": false,
        "is_competent_in_delivery_period": false,
        "is_competent_in_edit_account": false,
        "is_competent_in_registration_problems": false,
        "is_competent_in_change_shipping_address": false,
        "is_competent_in_set_up_shipping_address": false,
        "is_competent_in_place_order": false,
        "is_competent_in_cancel_order": false,
        "is_competent_in_check_invoice": false
    }
    if (list.includes(true) || list.includes(false)){
        let newList = list
        list = []
        for (let i in newList) {
            if (newList[i]) {
                list.push(Number(i))
            }
        }
    }
    let newStatuses = defaultStatuses;
    Object.keys(newStatuses).forEach((key, index) => {
        if (list.includes(index)) {
            newStatuses[key] = !reverse;
        } else {
            newStatuses[key] = reverse;
        }
    });
    return newStatuses
}