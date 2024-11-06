enum Code {
    SUCCESS = 200,
    SERVER_ERROR = 500,
  }
  
  class ResResult {
    static success(data: any = undefined, msg: any = '') {
      const code: Code = Code.SUCCESS;
      return { data, msg, code };
    }
    static fail(msg: any = '') {
      const code: Code = Code.SERVER_ERROR;
      return { undefined, msg, code };
    }
  }
  
  export const { success, fail } = ResResult;
  