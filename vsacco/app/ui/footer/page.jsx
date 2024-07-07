import {
    BookOpenIcon,
    MessagesSquareIcon,
    Settings2Icon,
    TabletSmartphoneIcon,
  } from "lucide-react";
  
  const Footer = () =>{

    return (
        <>
          {/* Icon Blocks */}
          <div className="container bg-primary py-4 lg:py-4">
            <div className="grid  sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
              {/* Icon Block */}
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 border bg-background rounded-full mx-auto">
                  <TabletSmartphoneIcon className="flex-shrink-0 w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="mt-3">
                  <h3 className="text-white text-lg font-semibold ">Transparent</h3>
                  <p className="mt-1 text-white text-muted">
                    All transactions documented
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-background border rounded-full mx-auto">
                  <Settings2Icon className="flex-shrink-0 w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg text-white font-semibold ">Chama To Sacco</h3>
                  <p className="mt-1 text-white text-muted">
                    We journey with you from grassroot to growth
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-background border rounded-full mx-auto">
                  <BookOpenIcon className="flex-shrink-0 w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg text-white font-semibold ">Documentation</h3>
                  <p className="mt-1 text-white text-muted">
                    Every aspect and function is well documented
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-background border rounded-full mx-auto">
                  <MessagesSquareIcon className="flex-shrink-0 w-5 h-5 text-secondary-foreground" />
                </div>
                <div className="mt-3">
                  <h3 className="text-lg text-white font-semibold ">24/7 Support</h3>
                  <p className="mt-1 text-white text-muted">
                    Contact us 24 hours a day, 7 days a week
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
          </div>
          {/* End Icon Blocks */}
        </>
      );
  }

  export default Footer;