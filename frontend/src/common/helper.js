// Error/Exception response handler
export function responseHandler(response,history){
  if(response.status === 401){
      sessionStorage.setItem('user',null);
      history.push('/');
      return alert(response.message);
  }else{
      return alert(response.message);
  }
}
