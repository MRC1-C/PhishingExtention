import './Popup.css'
import { useEffect, useState } from 'react'
import { AppstoreOutlined, CloseOutlined, MailOutlined, MenuUnfoldOutlined, PieChartOutlined, PoweroffOutlined, SettingOutlined, StopOutlined, WarningOutlined } from '@ant-design/icons'
import { Drawer, Menu, MenuProps, Progress, Steps } from 'antd'


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <MailOutlined />),
  getItem('Option 3', '3', <SettingOutlined />),
  getItem('Option 4', '4', <AppstoreOutlined />),
];

const Popup = () => {
  const [url, setUrl] = useState<String>('')
  const [state, setState] = useState<String>()
  const [percent, setPercent] = useState<Number>()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    (async () => {
      let queryOptions = { active: true };
      let [{ url }] = await chrome.tabs.query(queryOptions);
      let domain = (new URL('' + url));
      chrome.storage.local.get(['state', String(domain.hostname)], function (result) {
        setState(result.state)
        setPercent(result[String(domain.hostname)])
      });
      setUrl(domain.hostname)
    })()
  }, [])
  // useEffect(() => {
  //   return chrome.storage.local.set({ state: state, [url.toString()]: percent }, function () {
  //     // start timer
  //   });
  // }, [])
  const urlPromise = new Promise((resolve, reject) =>
    setTimeout(
      () => resolve(Math.floor(Math.random() * 101))
      , 1000)
  );
  const pending = {
    state: 'pending',
  };

  const getPromiseState = (promise: any) => {
    return Promise.race([promise, pending]).then(
      (value) => {
        if (value === pending) {
          return value;
        }
        return {
          state: 'resolved',
          value
        };
      },
      (reason) => ({ state: 'rejected', reason })
    );
  }

  const checkStatus = async (a: any) => {
    return await getPromiseState(a)
  }

  const handleLoading = async () => {
    let a = urlPromise;
    let result = await checkStatus(a);

    let s = setInterval(async () => {
      result = await checkStatus(a);
      let value = 0
      if (result.state == "resolved") {
        value = Math.floor(result.value);
        setState('result')
        setPercent(value)
        chrome.storage.local.set({ state: 'result', [url.toString()]: value }, function () {
          // start timer
        });
        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
          var activeTab = tabs[0];
          chrome.tabs.sendMessage(Number(activeTab.id), { "status": value });
        });
        clearInterval(s)
      }
    }, 100);
  };

  return (
    <div  >
      <Drawer
        className="m-0 p-0 bg-[#F5F5F5]"
        placement={'left'}
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        width={200}
      >
        <div className='h-full w-full'>
          <div className="h-[40px] p-4 flex justify-between items-center">
            <CloseOutlined className='cursor-pointer' onClick={() => setOpen(false)} />
            <p>22</p>
          </div>
          <Menu
            mode="inline"
            items={items}
            onClick={() => {
              let a = document.createElement('a')
              a.href = `chrome-extension://${chrome.runtime.id}/src/options/index.html`
              a.target = 'blank'
              a.click()
              a.remove()
            }}
          />
        </div>
      </Drawer>
      <div className='h-16 flex items-center justify-between'>
        <MenuUnfoldOutlined className='text-[#5C6975] font-bold text-[26px] cursor-pointer' onClick={() => setOpen(true)} />
        <img src='https://galaxylands.com.vn/wp-content/uploads/2022/12/tieu-su-ca-si-rose-blackpink-12.jpg' className='object-cover h-[30px] w-[30px] rounded-[50%]' />
        <SettingOutlined className='text-[24px] text-[#5C6975] cursor-pointer' />
      </div>
      <div className='h-[420px] flex items-center flex-col bg-white rounded-lg p-5'>
        <div className='font-bold text-3xl break-all text-center px-4'>{url}</div>
        {
          state == 'off' ?
            <div>
              <PoweroffOutlined className='text-[204px] text-gray-300 py-5 pb-2 cursor-pointer' onClick={() => {
                setState('loading')
                handleLoading()
              }
              }
              />
              <div className='text-center font-bold text-2xl'>Off</div>
              <div className='text-center'>Click to turn on</div>
            </div> :
            <div>
              <div onClick={() => {
                if (state == 'result') {
                  setState('off');
                  setPercent(0);
                  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
                    var activeTab = tabs[0];
                    chrome.tabs.sendMessage(Number(activeTab.id), { "status": "off" });
                  });
                  chrome.storage.local.set({ state: 'off' }, function () {
                    // start timer
                  });
                }
              }} className='cursor-pointer'>
                <Progress strokeColor={Number(percent) < 33 ? 'rgb(220 38 38)' : Number(percent) < 66 ? 'rgb(253 224 71)' : '#87d068'} type="circle" className='py-5 pb-2 font-bold text-3xl' size={204} percent={Number(percent)} />
              </div>
              <div className='text-center font-bold text-2xl'>{state == "loading" ? 'Loading' : Number(percent) < 33 ? "Dangerous" : Number(percent) < 66 ? "Warning" : "Safety"}</div>
              <div className='text-center'>Click to turn off</div>:
            </div>
        }
        <div style={{
          borderColor: Number(percent) < 33 ? 'rgba(249, 57, 32, 0.5)' : Number(percent) < 66 ? 'rgba(255, 213, 0, 0.5)' : 'rgba(58, 204, 108, 0.5)',
          backgroundColor: Number(percent) < 33 ? 'rgba(249, 57, 32, 0.05)' : Number(percent) < 66 ? 'rgba(255, 213, 0, 0.05)' : 'rgba(58, 204, 108, 0.05)', overflow: 'visible'
        }} className='border-2 border-solid w-full rounded-xl h-24 mt-3 flex flex-col items-center justify-center'>
          <div className='flex flex-row items-center gap-2 pb-1'>
            {
              (Number(percent) < 66 || state == "off") &&
              <WarningOutlined className='text-[20px]' style={{ color: Number(percent) < 33 ? 'rgba(249, 57, 32, 0.5)' : Number(percent) < 66 ? 'rgba(255, 213, 0, 0.5)' : 'rgba(58, 204, 108, 0.5)' }} />
            }
            <div className='text-[16px]' style={{ color: Number(percent) < 33 ? 'rgba(249, 57, 32, 1)' : Number(percent) < 66 ? 'rgba(255, 213, 0, 1)' : 'rgba(58, 204, 108, 1)' }}>
              {
                state == "off" ? "Tips" : state =="loading"?"Loading":Number(percent) < 66 ? "Cảnh báo" : "An toàn"
              }
            </div>
          </div>
          <div className='text-[#5C6975]'>
            {
              state == 'off' ? "Hãy bật cho sự an toàn" : Number(percent) < 33 ? 'Trang này là trang lừa đảo' : Number(percent) < 66 ? 'Trang này có nguy cơ lừa đảo' : 'Trang này là trang an toàn'
            }
          </div>
        </div>
      </div>
      {/* <div className='h-16 flex flex-col items-center justify-center'>
        <p className='text-center font-bold text-2xl text-gray-400'>@CJ</p>
      </div> */}
    </div>
  )
}

export default Popup