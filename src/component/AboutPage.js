import React from "react";
import "../styling/AboutPage.css";
import BackButton from "./BackButton";

const AboutPage = () => {
  return (
    <div id="about-container">
      <div className="ui piled segment">
        <h1 className="ui header">About</h1>
        <div className="emphasized">
          <p>
            {" "}
            <b>Equip</b> is an online marketplace for new and used durable
            medical equipment. It’s a place where transactions are <u>not</u>{" "}
            dictated by profit-driven big companies. Instead, all items are sold
            and bought by everyday individuals just like you.
          </p>
        </div>

        <div>
          <p>
            With <b>Equip</b>, retrieving an equipment is as easy as:
          </p>
          <ol>
            <li>Finding the item you need</li>
            <li>Sending the seller a quick inquiry email</li>
            <li>
              Setting up a shipping method or a convenient time to meet for
              pick-up
            </li>
          </ol>
          <p>
            Additionally, plenty of items are listed for donation or for sale at
            a low cost. You can conveniently browse by location, price, pick-up
            or shipping availability, as well as items' conditions.
          </p>
        </div>

        <div className="emphasized">Why Choose Equip?</div>

        <div>
          <p>
            <b>Equip</b> is a great option if you are:
          </p>
          <ul>
            <li>someone who wants to help reduce waste by reusing</li>
            <li>
              someone who might need an equipment only temporarily due to a
              short-term disability and does not want to overpay for something
              new
            </li>
            <li>
              someone who does not want to deal with the bureaucracy of getting
              your insurance company's approval for an equipment
            </li>
          </ul>
          {/* As an aside, new medical equipment runs <i>expensive</i>. A standard
          wheelchair, for example, can cost up to $300 and a power wheelchair,
          up to several grands. Insurance companies may cover only a{" "}
          <i>fraction</i> of the cost, <i>if at all</i>.{" "}
        </p>
        <p>
          There also tends to be a lengthy process that comes with getting
          coverage for your requested equipment. This include obtaining a letter
          of medical necessity from your healthcare professional and elaborating
          on proof of need for each specification of the equipment.{" "}
        </p>
        <p>
          Even then, Medicare or insurance companies could{" "}
          <i>deny your request</i> if they deem that your condition is not
          severe enough to warrant a medical equipment. This leads up to a
          lengthy back-and-forth process between all parties involved. It may be{" "}
          <i>months</i> before you are even approved for an equipment, let alone
          having it arrive at your door. */}
        </div>
        <div>
          <p>
            Ask anyone who lives in the United States and they’ll tell you that
            healthcare is nauseatingly expensive and comes with endless hoops to
            jump through. <b>Equip</b> is a solution to reduce healthcare costs
            and increase convenience for folks in need of medical equipment. It
            does so through the power of a marketplace community.{" "}
          </p>
        </div>

        <div className="emphasized">
          Donate. Buy. Sell. Or spread the word today.
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default AboutPage;
