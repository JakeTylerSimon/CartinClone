import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import React, { useMemo } from "react";

export default function PrivacyPolicy() {
  const lastUpdated = useMemo(() => "August 29, 2025", []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Header / Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-foreground">
            Privacy Policy
          </h1>
          <p className="mt-4 text-primary-foreground/90">
            Last updated: {lastUpdated}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* TOC */}
        <nav className="bg-card border border-border rounded-2xl p-6 mb-10">
            <h2 className="text-lg font-semibold text-card-foreground mb-3">
                Table of Contents
            </h2>
            <ul className="grid sm:grid-cols-2 gap-2 text-muted-foreground">
                {[
                ["#intro", "1. Introduction"],
                ["#definitions", "2. Interpretation & Definitions"],
                ["#collecting", "3. Collecting and Using Your Personal Data"],
                ["#use", "4. Use of Your Personal Data"],
                ["#disclosure", "5. Disclosure of Your Personal Data"],
                ["#how-we-use", "6. Applicable Law"],
                ["#sharing", "7. Liability Disclaimer"],
                ["#retention", "8. Changes to Our Privacy Policy"],
                ].map(([href, label]) => (
                <li key={href}>
                    <button
                    onClick={() => scrollTo(href)}
                    className="hover:text-primary transition-colors text-left"
                    >
                    {label}
                    </button>
                </li>
                ))}
            </ul>
        </nav>

        {/* 1 */}
        <section id="intro" className="mb-10">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground">1. Introduction</h3>
          <p className="leading-relaxed">
            This Privacy Policy outlines our policies and procedures regarding the collection, use, 
            and disclosure of Your information when You use Our Service (as defined herein). 
            It also informs You about Your privacy rights and how the law protects You.
            <br /><br />
            We use Your Personal 
            Data to provide, improve, and enhance the Service. BY ACCESSING OR USING the Our Service, 
            YOU CONSENT TO THE COLLECTION, USE, AND SHARING OF YOUR INFORMATION AS SET FORTH IN THIS PRIVACY POLICY.  
            This Privacy Policy explains how we handle the information we collect from users.  
            We may make changes to this Privacy Policy, so it's a good idea to review this Privacy Policy 
            carefully before using the Our Service or providing personal information to Us. 
          </p>
        </section>

        {/* 2 */}
        <section id="definitions" className="mb-10">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground">2. Interpretation & Definitions</h3>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
                <span className="text-foreground font-semibold">Interpretation</span>: 
                The words that begin with a capital letter have specific meanings defined under the following conditions. 
                These definitions will remain consistent regardless of whether they appear in singular or plural form.
            </li>
            <li>
                <span className="text-foreground font-semibold">Definitions</span>: 
                For the purposes of this Privacy Policy:
            </li>
            <li>
                <span className="text-foreground font-semibold">Account</span>: 
                A unique account created for You to access Our Service or parts of Our Service.
            </li>
            <li>
                <span className="text-foreground font-semibold">Affiliate</span>: 
                An entity that controls, is controlled by, or is under common control with another party, where “control” means 
                ownership of 50% or more of the shares, equity interest, or other securities entitled to vote for the election of directors 
                or other managing authority.
            </li>
            <li>
                <span className="text-foreground font-semibold">Application</span>: 
                CARTIN’ — the software program provided by the Company.
            </li>
            <li>
                <span className="text-foreground font-semibold">Company</span>: 
                (sometimes referred to herein as “the Company,” “We,” “Us,” or “Our” in this Privacy Policy) refers to JCA Technologies LLC, 
                located in the State of Florida.
            </li>
            <li>
                <span className="text-foreground font-semibold">Device</span>: 
                Refers to any device whatsoever that can access the Service, such as, for example, a computer, a cellphone, or a digital tablet.
            </li>
            <li>
                <span className="text-foreground font-semibold">Personal Data</span>: 
                Refers to any information that relates to an identified or identifiable individual.
            </li>
            <li>
                <span className="text-foreground font-semibold">Service</span>: 
                Refers to the Application.
            </li>
            <li>
                <span className="text-foreground font-semibold">Service Provider</span>: 
                Refers to any natural or legal person who processes the data on behalf of the Company. It includes third-party companies 
                or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, 
                to perform services related to the Service, or to assist the Company in analyzing how the Service is used.
            </li>
            <li>
                <span className="text-foreground font-semibold">Third-party Social Media Service</span>: 
                Refers to any website or social network website through which a user can log in or create an account to use the Service.
            </li>
            <li>
                <span className="text-foreground font-semibold">Usage Data</span>: 
                Refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself 
                (for example, the duration of a page visit).
            </li>
            <li>
                <span className="text-foreground font-semibold">You</span>: 
                (sometimes referred to herein as “Your”) refers to the individual accessing or using the Service, or the company, or any other 
                legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </li>
            </ul>
        </section>

        {/* 3. Collecting and Using Your Personal Data */}
        <section id="collecting" className="mb-10">
            <h3 className="text-2xl font-bold mb-3 text-card-foreground">3. Collecting and Using Your Personal Data</h3>
            <div className="space-y-4 leading-relaxed">
            <p><span className="text-foreground font-semibold">Personal Data:</span> While using Our Service, We may request certain personally identifiable information that can be used to contact or identify You. This information may include, but is not limited to: Email address, First and Last name, Phone number, Address, Social Media Profile information, Location (GPS), Contacts, Camera, Microphone, Usage Data, and other info.</p>
            <p><span className="text-foreground font-semibold">Usage Data: </span> 
            C Usage Data is collected automatically when using the Service, and may be either generated by the use of the 
            Service or from the Service infrastructure itself (for example, the duration of a page visit).  
            This data may include information like Your device’s Internet Protocol address (e.g., IP address), browser type, 
            browser version, the pages of our Services that You visit, Your visit time and date, the time spent on those 
            pages, unique device identifiers, and other diagnostic data. When You access our Service through a mobile device, 
            We may also collect certain information automatically, including, but not limited to, the type of mobile device 
            You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the 
            type of mobile internet browser You use, unique device identifiers and other diagnostic data. Additionally, 
            We may also collect information that Your browser sends when You visit Our Service, or when You access the 
            Service by or through a mobile device. </p>
            <p><span className="text-foreground font-semibold">Information from Third-Party Social Media Services: </span> 
            If You register via Google, Facebook, Instagram, Twitter, or LinkedIn, we may collect your name, email, 
            activities, or contact list, consistent with this Privacy Policy. If You decide to register through or 
            otherwise grant us access to a Third-Party Social Media Service, We may collect Personal Data already 
            associated with Your Third-Party Social Media Service's account, such as Your name, Your email address, 
            Your activities, or Your contact list associated with that account. You may also choose to share additional 
            information with the Company through Your Third-Party Social Media Service's account. If You opt to provide 
            such information and Personal Data during registration or otherwise, You grant the Company permission to use, 
            share, and store it in accordance with this Privacy Policy. </p>
            <p><span className="text-foreground font-semibold">Information Collected while Using the Application: </span> 
            With your permission, we may collect your location, contacts, photos/camera, and microphone. 
            You may enable or disable access in your device settings at any time. We use this information to 
            provide features of Our Service, to improve and customize Our Service. The information may be 
            uploaded to our Company’s servers and/or a service Provider’s server, or it may be stored on Your 
            device. You have the option to enable or disable access to this information at any time through 
            Your Device’s settings. </p>
            </div>
        </section>

        {/* 4. Use of Your Personal Data */}
        <section id="use" className="mb-10">
        <h3 className="text-2xl font-bold mb-3 text-card-foreground">4. Use of Your Personal Data</h3>
        <div className="space-y-4 leading-relaxed">
            <p>
            Company may use Your Personal Data for any or all of the following purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain Our Service; including to monitor the usage of Our Service.</li>
            <li>To manage Your account: to manage Your registration as a user of the service. The Personal Data You provide can grant You access to different functionalities of the Service that are available to You as a registered user.</li>
            <li>For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</li>
            <li>To contact You: We may contact You via email, telephone calls, SMS, or any other electronic communication forms of any kind whatsoever, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted Services, including the security updates, when necessary or reasonable for their implementation.</li>
            <li>To provide You: with news, special offers, and general information about other goods, services, and events We offer that are similar to those You’ve already purchased or inquired about unless You have opted not to receive such information.</li>
            <li>To manage Your requests: To attend and manage Your requests to Us.</li>
            <li>For business transfers: We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about Our Service users is among the assets transferred.</li>
            <li>For other purposes: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve Our Service, products, services, marketing and your experience.</li>
            </ul>

            <p>
            We may also use and/or share Your personal information for other purposes, in the following situations:
            </p>
            <ul className="list-disc pl-6 space-y-2">
            <li>With Service Providers: We may share Your personal information with Service Providers to monitor and analyze the use of Our Service, and to contact You.</li>
            <li>For business transfers: We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
            <li>With Affiliates: We may share Your information with Our Affiliates, in which case We will require those Affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners, or other companies that We control, or that are under common control with Us.</li>
            <li>With business partners: We may share Your information with Our business partners to offer You certain products, services, or promotions.</li>
            <li>With other users: When You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside. If You interact with other users or register through a ThirdParty Social Media Service, Your contacts on the Third-Party Social Media Service may see Your name, profile, pictures, and description of Your activity. Similarly, other users will be able to view descriptions of Your activity, communicate with You, and view Your profile.</li>
            <li>With Your consent: We may disclose Your personal information for any other purpose whatsoever with Your prior consent.</li>
            </ul>

            <p>
            <span className="text-foreground font-semibold">Retention of Your Personal Data:</span> The Company will retain Your Personal Data only for as long as necessary for the purposes outlined in this Privacy Policy. We will retain and use Your Personal Data to the extent required to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies. The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when it’s used to enhance security or improve the functionality of our Service, or when We are legally obligated to retain it for a longer duration.
            </p>

            <p>
            <span className="text-foreground font-semibold">Geolocation Data:</span> We will collect location information such as Your geolocation, route, and travel information to provide you the Application in connection with the services herein. When You use the Service, We collect detailed location, including GPS signals and other device sensor data such as gyro/oscilloscope, sent by Your Device on which the Service is installed and activated. This enables Us to provide you the Service and to create a detailed location history of your public transit trips. PLEASE NOTE THAT WE COLLECT YOUR LOCATION DATA IN THE BACKGROUND EVEN WHEN YOU ARE NOT USING THE APPLICATION TO PERSONALIZE THE SERVICES, AND MAXIMIZE YOUR USER EXPERIENCE, AND TO DEVELOP AND ENHANCE OUR PUBLIC TRANSIT INFORMATION SERVICES. YOU MAY CHOOSE TO DISABLE AND OPT-OUT FROM THIS BACKGROUND COLLECTION OF DATA UNDER THE APPLICATION’S PRIVACY SETTINGS.
            </p>

            <p>
            <span className="text-foreground font-semibold">Transfer of Your Personal Data:</span> Your information, including Personal Data, is processed at the Company’s operating offices and any other locations where the parties involved in the processing are present. This means that Your information may be transferred to and maintained on computers located outside Your state, province, country, or other governmental jurisdiction where data protection laws may differ from those in Your jurisdiction. By submitting Your information and consenting to this Privacy Policy, and You representing that You agree to this transfer. The Company will take all reasonable steps to ensure that Your data is treated securely and in accordance with this Privacy Policy. No transfer of Your Personal Data will occur to an organization or country unless there are adequate controls in place, including the security of Your data and other personal information.
            </p>

            <p>
            <span className="text-foreground font-semibold">Deleting Your Personal Data:</span> You have the right to delete or request Our assistance in deleting the Personal Data We have collected about You. Our Service may provide You with the ability to delete certain information from within the Service. You can update, amend, or delete Your information at any time by signing in to Your account (if You have one) and visiting the account settings section that allows You to manage Your personal information. You may also contact us to request access to, correct, or delete any personal information You have provided to Us. Please note, however, that We may need to retain certain information when We have a legal obligation or lawful basis to do so.
            </p>
        </div>
        </section>


        {/* 5. Disclosure of Your Personal Data */}
        <section id="disclosure" className="mb-10">
        <h3 className="text-2xl font-bold mb-3 text-card-foreground">5. Disclosure of Your Personal Data</h3>
        <div className="space-y-4 leading-relaxed">
            <p>
            <span className="text-foreground font-semibold">Business Transactions:</span> If the Company is involved in a merger, acquisition, or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
            </p>

            <p>
            <span className="text-foreground font-semibold">Law Enforcement:</span> Under certain circumstances, the Company may be compelled to disclose Your Personal Data by law or in response to valid requests from public authorities, such as a court or a government agency.
            </p>

            <p>
            <span className="text-foreground font-semibold">Other Legal Requirements:</span> The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
            <li>Protect the personal safety of users of the Service or the public</li>
            <li>Protect against legal liability</li>
            </ul>

            <p>
            <span className="text-foreground font-semibold">Security of Your Personal Data:</span> The security of Your Personal Data is important to Us, We employ reasonable and appropriate administrative, physical, and technical measures designed to protect the security of personal information we collect from You. However, please remember that no method of transmission over the Internet, or method of electronic storage, is totally 100% secure, and although we have taken steps to protect your personal information from being intercepted, accessed, used or disclosed by unauthorized persons, we cannot fully eliminate security risks associated with personal information. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot, nor do We, guarantee its absolute security.
            </p>

            <p>
            <span className="text-foreground font-semibold">Children's Privacy:</span> Our Service is not intended for individuals under the age of 13. We do not knowingly collect personally identifiable information from anyone under 13. If You are a parent or guardian, and believe that Your child has provided Personal Data to Us, please contact Us as soon as possible. If We become aware of the collection of Personal Data from individuals under 13 without parental consent, We promptly remove that information from Our servers. Furthermore, if We need to rely on consent as a legal basis for processing Your information, and Your country requires parental consent, We may request Your parent’s consent before collecting and using that information.
            </p>

            <p>
            <span className="text-foreground font-semibold">Links to Other Websites:</span> Our Service may contain links to other websites that are not operated by Us. If You click on a third-party link, You will be directed to that third party’s site. We strongly advise You to review the Privacy Policy of every website You visit. Please be aware that We have no control over, We assume no responsibility, and we forever disclaim any and all liability, for the content, privacy policies, or practices of any third-party sites or services.
            </p>
        </div>
        </section>

        {/* 6 */}
        <section id="how-we-use" className="mb-10">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground">6. Applicable Law </h3>
          <p className="leading-relaxed">
            This Privacy Policy is governed by the internal substantive laws of Florida without regard to its conflict of laws principles. Jurisdiction and venue for any claims arising under or out of this Privacy Policy shall lie exclusively with the state and federal courts within Florida.  If any provision of this Policy is found to be invalid by a court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of this Privacy Policy, which shall remain in full force and effect.  
          </p>
        </section>

        {/* 7 */}
        <section id="sharing" className="mb-10">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground">7. Liability Disclaimer </h3>
          <p className="leading-relaxed">
            The Service is provided for informational purposes only and should not be considered a substitute for your own judgment and caution. The Service may contain inaccuracies or outdated information, and Company assumes no responsibility or liability for any damages arising from the use of the Service. Users should always verify directions with other sources and exercise due diligence when navigating. 
            </p>
          <p className="leading-relaxed font-bold">
            <br />THIS SERVICE IS PROVIDED BY THE COMPANY AND CONTRIBUTORS FOR “USE ON AN AS IS" AND “AS AVAILABLE” BASIS.  THE SERVICE CANNOT BE CUSTOMIZED TO FULFILL THE NEEDS OF EACH AND EVERY USER.  COMPANY HEREBY DISCLAIMS ANY AND ALL EXPRESS OR IMPLIED WARRANTIES AND REPRESENTATIONS, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, FEATURES, QUALITY, NON-INFRINGEMENT, TITLE, COMPATIBILITY, PERFORMANCE, SECURITY, OR ACCURACY.  IN NO EVENT SHALL COMPANY OR CONTRIBUTORS EVER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
            </p>
        </section>

        {/* 8 */}
        <section id="retention" className="mb-10">
          <h3 className="text-2xl font-bold mb-3 text-card-foreground">8. Changes to Our Privacy Policy </h3>
          <p className="leading-relaxed">
            We reserve the right to make changes to this Privacy Policy at any time. We’ll notify You of any changes by posting the updated Privacy Policy on this page.
            <br /><br /> We’ll also inform You via email and/or a prominent notice on Our Service before the change takes effect.  Additionally, We’ll update the “Last updated” date at the bottom of this Privacy Policy.
            <br /><br /> You are hereby advised to review this Privacy Policy periodically to stay informed about any changes. Please note that changes to this Privacy Policy immediately become effective against You when they’re posted on this page.
            
            </p>
            <p>
            <span className="text-foreground font-semibold"><br />Contact Us: </span> 
            If You have any questions about this Privacy Policy, 
            feel free to contact us: <br /> By email: info@cartin.app 
            </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
