
/*

ok, now create a small BMI calculator that enables the user to input their height in feet-inches and their weight in pounds, and calculate their BMI Body Mass Index number, and also report if they are obese, over weight, normal, or underweight by normal medical standards. please create the index.html file, and a script.js and styles.css file for a mobile-responsive web application


Caloric needs for both men and women vary based on several factors, including height, weight, age, activity level, 
and overall health. However, one common method for estimating daily calorie requirements is the Mifflin-St Jeor Equation, 
which calculates the Basal Metabolic Rate (BMR). The BMR represents the number of calories a person burns at rest, and 
you can then multiply it by an activity factor to estimate total daily calorie needs.


Total Daily Energy Expenditure (TDEE):

Once you calculate the BMR, you can multiply it by an activity factor to estimate the total calories burned in a day:

	•	Sedentary (little to no exercise): BMR × 1.2
	•	Lightly active (light exercise/sports 1-3 days a week): BMR × 1.375
	•	Moderately active (moderate exercise/sports 3-5 days a week): BMR × 1.55
	•	Very active (hard exercise/sports 6-7 days a week): BMR × 1.725
	•	Extra active (very hard exercise/physical job, or 2x training): BMR × 1.9


Explanation (code):

	•	Gender: Determines which version of the Mifflin-St Jeor equation is used.
	•	Height, Weight, and Age: Used in the BMR calculation formula.
	•	Activity Level: Determines the multiplier for calculating Total Daily Energy Expenditure (TDEE).
	•	Switch Statement: Assigns the appropriate activity multiplier based on the provided activity level.

Activity Levels:

	•	Sedentary: Little to no exercise.
	•	LightlyActive: Light exercise/sports 1-3 days a week.
	•	ModerateActive: Moderate exercise/sports 3-5 days a week.
	•	VeryActive: Hard exercise/sports 6-7 days a week.
	•	ExtraActive: Very hard exercise or physically demanding job.

The function returns the total number of calories needed per day as a float rounded to two decimal places.


*/

// sed, lightly, moderate, veryActive, ExtraActive
let activityLevel = [ 1.200, 1.375, 1.550, 1.725, 1.900 ];


function CalcCalories( gender0, cm0, kg0, age0, actlvl0 ){
    let bmr = 0.0;
    if(gender0=="female"){
        bmr = 10.0 * kg0      + 6.25 * cm0        - 5 * age0       - 161;
        // $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age - 161;

    }else{      // male, other == male
        bmr = 10.0 * kg0      +  6.25 * cm0      -  5 * age0       + 5;
        // Mifflin-St Jeor for men
        //$BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age + 5;

    }


    // Calculate total daily caloric demand (TDEE)
    // $caloriesNeeded = $BMR * $activityFactor;
    let caloriesNeeded = bmr * activityLevel[actlvl0];
    console.log("actlvl0 =", actlvl0);
    console.log("activityLevel =", activityLevel[actlvl0]);
    console.log("bmr =", bmr);

    return( caloriesNeeded );
}


function CalcCaloricDeficit(tdee, kg, days, percentLoss) {
    console.log("INSIDE CalcCaloricDef()" );

    console.log("kg =, lbs = ", kg, (kg*2.2) );

    // Calculate the total weight to lose
    let weightToLose = kg * (percentLoss / 100);
    console.log("kg =, lbs = , lbs2lose=", kg, (kg*2.2) ,  weightToLose*2.2 );

    // 1 kilogram of body weight requires a 7700 calorie deficit
    let totalCaloricDeficit = weightToLose * 7700;


    console.log("weight to lose (kg), totalCaloricDeficit:", weightToLose , totalCaloricDeficit);
    // Calculate the daily caloric deficit required to lose the weight in the given time
    let dailyCaloricDeficit = totalCaloricDeficit / days;
    console.log("dailyCaloricDeficit = totalCaloricDef / days:", dailyCaloricDeficit , totalCaloricDeficit ,"/", days  );

    // Calculate the daily caloric intake by subtracting the daily deficit from TDEE
    let dailyCaloriesToConsume = tdee - dailyCaloricDeficit;

    console.log("dailyCaloricDeficit, dailyCaloriesToConsume:", dailyCaloricDeficit , dailyCaloriesToConsume);

    // Output the daily caloric deficit and the daily calories to consume
    return {
        dailyCaloricDeficit: dailyCaloricDeficit.toFixed(0),
        dailyCaloriesToConsume: dailyCaloriesToConsume.toFixed(0)
    };
}

// // Example Usage
// let result = CalcCaloricDeficit(2600, 100, 180, 10); // tdee = 2600, weight = 100kg, 180 days, 10% weight loss
// console.log(`Daily Caloric Deficit: ${result.dailyCaloricDeficit}`);
// console.log(`Daily Calories to Consume: ${result.dailyCaloriesToConsume}`);






/*

for CalcCaloricDeficit()
Explanation:
tdee: Total Daily Energy Expenditure (calories needed per day to maintain current weight).
kg: Your current weight in kilograms.
days: The number of days you plan to lose the weight.
percentLoss: The percentage of your current weight you want to lose.
How it works:
The function calculates the amount of weight you want to lose (based on the percentage).
It calculates the total caloric deficit needed to lose that weight (1 kg = 7,700 calories).
The daily caloric deficit is determined by dividing the total caloric deficit by the number of days.
The function returns both the daily caloric deficit and the new daily calories to consume.
Example:
If you have a TDEE of 2600 calories, weigh 100 kg, want to lose 10% of your body weight (10 kg) over 180 days:

The daily caloric deficit will be around 427 calories.
You should consume around 2173 calories per day to achieve this goal.



function CaloricDemand($gender, $height_cm, $weight_kg, $age, $activityLevel) {
    // Calculate BMR based on gender
    if ($gender === "male") {
        // Mifflin-St Jeor for men
        $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age + 5;
    } else if ($gender === "female") {
        // Mifflin-St Jeor for women
        $BMR = 10 * $weight_kg + 6.25 * $height_cm - 5 * $age - 161;
    } else {
        return "Invalid gender. Please specify 'male' or 'female'.";
    }

    // Activity multiplier based on activity level
    switch ($activityLevel) {
        case "Sedentary":
            $activityFactor = 1.2;
            break;
        case "LightlyActive":
            $activityFactor = 1.375;
            break;
        case "ModerateActive":
            $activityFactor = 1.55;
            break;
        case "VeryActive":
            $activityFactor = 1.725;
            break;
        case "ExtraActive":
            $activityFactor = 1.9;
            break;
        default:
            return "Invalid activity level. Please specify 'Sedentary', 'LightlyActive', 'ModerateActive', 'VeryActive', or 'ExtraActive'.";
    }

    // Calculate total daily caloric demand (TDEE)
    $caloriesNeeded = $BMR * $activityFactor;

    return round($caloriesNeeded, 2); // Returning rounded value for better readability
}

*/


document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // option price PAID
    let optionsPricePaid = parseFloat(document.getElementById('feet').value);

    // stock price at time of options purchase
    let stockPriceAtOptionsPaid = parseFloat(document.getElementById('inches').value);

    // strike
    let strikePrice = parseFloat(document.getElementById('weight').value); 

    // tgt stock price
    let targetprice = parseFloat(document.getElementById('targetprice').value);

    //put 0   / call 1
    let putCall = parseFloat(document.getElementById('age').value);


// assume Call
    let premiumFromTodayTilExpiry       = 0.0;
    let premiumFromTodayTilExpiry0      = 0.0;
    let optionsPriceIntrinsic           = 0;
    let optionsPriceExtrinsic           = 0;
    let premiumDaily                    = 0;
    let daysTilExpiryAdjusted           = 0;
    let optionsPriceCalculated          = 0.0;
    let optionsPriceCalculated1         =0.0;
    let optionsPriceCalculatedIntrinsicOnly = 0.0;

    let callOrPutStr = "Call";
    if(putCall==0) callOrPutStr = "Put";


// assume Calls 
if(putCall==1){

      optionsPriceIntrinsic = (stockPriceAtOptionsPaid - strikePrice ).toFixed(2);
      optionsPriceExtrinsic = (optionsPricePaid - optionsPriceIntrinsic).toFixed(2);

      premiumDaily         = (optionsPriceExtrinsic /  (daysTilExpiry)).toFixed(4);  // note daysTilExpiry = days from Purchase to Expiry


    // check if date of purchase is behind us, not today
    // if(optionsPurchaseDate_daysFromToday < 0){
        if(true){
        // get new # of days from today to Expiry, but use the orig calc from Options Purchase to Expiry for daily Premium
          daysTilExpiryAdjusted         = daysTilExpiry + optionsPurchaseDate_daysFromToday;
          premiumFromTodayTilExpiry0    =  daysTilExpiryAdjusted * premiumDaily  ;
          premiumFromTodayTilExpiry     = (daysTilExpiryAdjusted * premiumDaily ).toFixed(2);
    }
    optionsPriceCalculated  = parseFloat(targetprice - strikePrice);  
    optionsPriceCalculatedIntrinsicOnly  = parseFloat(targetprice - strikePrice);  
    optionsPriceCalculatedIntrinsicOnly = optionsPriceCalculatedIntrinsicOnly.toFixed(2);
    
    optionsPriceCalculated+=  premiumFromTodayTilExpiry0;
    optionsPriceCalculated1 = optionsPriceCalculated.toFixed(2);



}else{
// assume Puts


      optionsPriceIntrinsic = ( strikePrice - stockPriceAtOptionsPaid  ).toFixed(2);
      optionsPriceExtrinsic = (optionsPricePaid - optionsPriceIntrinsic).toFixed(2);

      premiumDaily         = (optionsPriceExtrinsic /  (daysTilExpiry)).toFixed(4);  // note daysTilExpiry = days from Purchase to Expiry


    // check if date of purchase is behind us, not today
    // if(optionsPurchaseDate_daysFromToday < 0){
        if(true){
        // get new # of days from today to Expiry, but use the orig calc from Options Purchase to Expiry for daily Premium
          daysTilExpiryAdjusted         = daysTilExpiry + optionsPurchaseDate_daysFromToday;
          premiumFromTodayTilExpiry0    =  daysTilExpiryAdjusted * premiumDaily  ;
          premiumFromTodayTilExpiry     = (daysTilExpiryAdjusted * premiumDaily ).toFixed(2);
    }
    optionsPriceCalculated              = parseFloat( strikePrice - targetprice);  
    optionsPriceCalculatedIntrinsicOnly = parseFloat( strikePrice - targetprice );  
    optionsPriceCalculatedIntrinsicOnly = optionsPriceCalculatedIntrinsicOnly.toFixed(2);
    
    optionsPriceCalculated+=  premiumFromTodayTilExpiry0;
    optionsPriceCalculated1 = optionsPriceCalculated.toFixed(2);

}

document.getElementById('result').innerHTML = `Target ${callOrPutStr} Options Price: $ ${optionsPriceCalculated1}. With ${daysTilExpiry} days from purchase to expiry the Daily Premium is: $ ${premiumDaily}. Intrinsic/Extrinsic value: ${optionsPriceIntrinsic} / ${optionsPriceExtrinsic}. Days from Purchase to Today: ${optionsPurchaseDate_daysFromToday} with a remaining Premium of: $ ${premiumFromTodayTilExpiry}, Target Price (intrinsic Only): $ ${optionsPriceCalculatedIntrinsicOnly}`;




                // <script>
                //     const purchaseDatePicker = document.getElementById('options-purchase-date');
                //     const expiryDatePicker = document.getElementById('options-expiry');
                    
                //     let daysTilExpiry = 1;

                //     let timeDifference;



                //     expiryDatePicker.addEventListener('change', () => {
                //         // Get the purchase date or default to today if blank
                //         const purchaseDateValue = purchaseDatePicker.value || new Date().toISOString().split('T')[0];
                //         const expiryDateValue = expiryDatePicker.value;

                //         if (!expiryDateValue) {
                //             console.log("Please select an expiry date.");
                //             return;
                //         }

                //         const purchaseDate = new Date(purchaseDateValue);
                //         const expiryDate = new Date(expiryDateValue);

                //         // Calculate days between purchase and expiry
                //           timeDifference = expiryDate - purchaseDate;
                //         // const daysTilExpiryOnDateOfPurchase = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
                //           daysTilExpiry = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

                //         console.log(`Purchase date: ${purchaseDateValue}`);
                //         console.log(`Expiry date: ${expiryDateValue}`);
                //         // console.log(`Days until expiry on date of purchase: ${daysTilExpiryOnDateOfPurchase}`);
                //     });
                // </script>










//     const gender = document.getElementById('gender').value ;
//     const actlevel = parseInt(document.getElementById('actlevel').value) ;

//     const days2lose = parseInt(document.getElementById('days').value) ;
//     const pct2lose  = parseInt(document.getElementById('pct').value) ;
//     const email0 = document.getElementById('email').value ;


//     const heightInInches = (feet * 12) + inches;
//     const heightInMeters = heightInInches * 0.0254;
//     const weightInKg = weight * 0.453592;


//     const bmi = weightInKg / (heightInMeters * heightInMeters);
//     const bmiRounded = bmi.toFixed(1);

//     let category = '';

//     if (bmi < 18.5) {
//         category = 'Underweight: BMI less than 18.5';
//     } else if (bmi >= 18.5 && bmi < 24.99) {
//         category = '😉Normal weight: BMI 18.5 to 24.9';
//     } else if (bmi >= 25 && bmi < 29.99) {
//         category = '⚠️Overweight: BMI 25 to 29.9';
//     } else if (bmi >= 30 && bmi < 34.99) {
//         category = '☠️  Obese Class 1: BMI 30 to 34.9';
//     } else if (bmi >= 35 && bmi < 39.99) {
//         category = '☠️☠️ Obese Class 2: BMI 35 to 39.9';
//     } else if (bmi >= 40 && bmi < 49.99) {
//         category = '☠️☠️☠️Obese Class 3: Severe/Morbid Obesity: BMI 40+';
//     } else {
//         category = '☠️☠️☠️☠️Obese Class 4: You are Morbidly Obese: BMI 50+  SEE A DR!';
//     }

//     let cm0=(heightInMeters*100).toFixed(1);
//     let cn = CalcCalories(gender, cm0,  weightInKg, age, actlevel );
//     let cn1 = cn.toFixed(2);
//     // let addstr = 'Calories needed:' + cn1 + '/day   gender:' + gender+ ' age:' + age +' actLvl:' + actlevel ;
//     let addstr = 'Calories needed/day:' + cn1 ;  
    
// let lbs2lose =  weight * (pct2lose/100);
// lbs2lose=lbs2lose.toFixed(0);

// let lbsTarget = weight * (1- pct2lose/100);
// lbsTarget=lbsTarget.toFixed(1);


// let result = CalcCaloricDeficit(cn1 , weightInKg, days2lose, pct2lose ); // tdee = 2600, weight = 100kg, 180 days, 10% weight loss
// console.log(`Daily Caloric Deficit: ${result.dailyCaloricDeficit}`);
// console.log(`Daily Calories to Consume: ${result.dailyCaloriesToConsume}`);
// let cals2consume  =result.dailyCaloriesToConsume;
// let cals2cut      =result.dailyCaloricDeficit;
// let email1a = ""; //email0.split('@')[0]; //+','; // Get the part before the '@'

// if(email0!=""){
//     email1a = email0.split('@')[0];
//     email1a = email1a +',' ;
// }else email1a = "Ok,";
// let addstr2 = email1a + ` to lose `+pct2lose +`% or `+ lbs2lose+`lbs, over `+ days2lose +` days, <strong>consume `+cals2consume +`</strong> calories/day.<br>` ;

// let kilos = weightInKg.toFixed(1);
// document.getElementById('result').innerHTML = `At ${kilos}kg & ${cm0}cm: your BMI is ${bmiRounded}, classified as ${category}. <br>${addstr}. <br>${addstr2}`;
    





 

});