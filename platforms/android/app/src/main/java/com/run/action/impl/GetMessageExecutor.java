package com.run.action.impl;

import com.run.action.CommandExecutor;
import com.run.receiver.ActionReceiver;
import com.run.util.HttpUtil;
import com.run.util.JsonParser;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.apache.cordova.whitelist.HttpRequestPlugin.relData;
import static org.apache.cordova.whitelist.HttpRequestPlugin.token;
import static org.apache.cordova.whitelist.HttpRequestPlugin.userInnerId;

/**
 * Created by Xiao on 2018/4/3.
 */

public class GetMessageExecutor extends CommandExecutor {

    @Override
    public boolean execute() throws JSONException {
        String url = actionReceiver.getUrl();
        JSONArray params = actionReceiver.getParams();
        int page = params.getInt(0);
        int row = params.getInt(1);
        CallbackContext callbackContext = actionReceiver.getCallbackContext();
        Map<String, Object> data = new HashMap<>();
        data.put("userInnerId", userInnerId);
        data.put("cardId", relData.getResult().get(0).getCardId());
        data.put("token", token);//MD5处理
        data.put("page", page);
        data.put("rows", row);
        String rel = HttpUtil.sendRequest(url, data);
        Map<String, Object> relData = JsonParser.toObj(rel, Map.class);
        ArrayList<Map<String, Object>> result = (ArrayList<Map<String, Object>>) relData.get("result");
        if (null != rel) {
            callbackContext.success(JsonParser.toJson(result));//如果不调用success回调，则js中successCallback不会执行
            return true;
        } else {
            return false;
        }
    }
    private ActionReceiver actionReceiver;

    @Override
    public ActionReceiver getActionReceiver() {
        return actionReceiver;
    }

    @Override
    public void setActionReceiver(ActionReceiver actionReceiver) {
        this.actionReceiver = actionReceiver;
    }
}
