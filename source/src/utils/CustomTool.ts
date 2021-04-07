module fgui {
    export class CustomTool {
        constructor(parameters) {
        }

        /**
         * 集成 parseStr2Object 和 parseStr2Array 接口
         * @param  {string} pStr
         * @returns Object
         */
        public static parseStr2ObjectOrArray(pStr: string): Object {
            if (!pStr || pStr == "")
                return null;
            if (pStr.charAt(0) == "{" && pStr.charAt(pStr.length - 1) == "}")
                return this.parseStr2Object(pStr);
            else if (pStr.charAt(0) == "[" && pStr.charAt(pStr.length - 1) == "]")
                return this.parseStr2Array(pStr);
            else
                null;
        }

        /**
         * 把"{type:1, id:123}"这样的字符串转换成Object类
         * @param  {string} str
         * @returns Object
         */
        public static parseStr2Object(str: string): Object {
            let t_obj: Object = {};
            let t_reg: RegExp = /([^\s\{,\}:]+):([^\s,\}]+)/g;
            var t_arr: Array<any> = t_reg.exec(str);
            while (t_arr && t_arr.length > 0) {
                let t_key = t_arr[1];
                let t_value = t_arr[2];
                if (isNaN(t_value)) {
                    t_obj[t_key] = t_value;
                }
                else {
                    t_obj[t_key] = parseInt(t_value);
                }

                t_arr = t_reg.exec(str);
            }
            return t_obj;
        }

        /**
         * 把"[xxx,xxx,xxx,xx]"字符串转换成数组
         * @param  {string} pStr
         * @returns any
         */
        public static parseStr2Array(str: string): any[] {
            let t_list: any[] = [];
            let t_reg: RegExp = /[^\s\[,\]]+/g;
            var t_arr: Array<any> = t_reg.exec(str);
            while (t_arr && t_arr.length > 0) {
                let t_value = t_arr[0];
                if (isNaN(t_value)) {
                    t_list.push(t_value);
                }
                else {
                    t_list.push(parseInt(t_value));
                }

                t_arr = t_reg.exec(str);
            }
            return t_list;
        }
    }
}