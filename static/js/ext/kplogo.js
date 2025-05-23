document.addEventListener("DOMContentLoaded", function () {

    let dots = [
        [[98, 50], [14, 50], [66, 86], [84, 64], [44, 14], [82, 40], [58, 70], [34, 16], [52, 84], [18, 64], [22, 30]],
        [[6, 68], [26, 45], [39, 82], [66, 72], [53, 50], [87, 40], [82, 63], [39, 60], [27, 23], [55, 38], [63, 21]],
        [[6, 72], [19, 41], [24, 73], [43, 85], [66, 72], [47, 50], [87, 40], [82, 63], [37, 67], [27, 23], [55, 38], [63, 21]],
        [[6, 72], [19, 41], [42, 39], [43, 85], [66, 72], [58, 41], [87, 40], [82, 63], [31, 60], [27, 23], [52, 30], [63, 21]],
        [[10, 20], [16, 44], [35, 31], [22, 60], [31, 78], [50, 35], [85, 46], [66, 82], [41, 52], [62, 51], [72, 27], [43, 18]],
        [[10, 20], [16, 44], [30, 31], [20, 69], [36, 54], [79, 72], [85, 46], [66, 25], [68, 49], [47, 85], [47, 15]],
        [[97.625, 63.5], [27.75, 19.5], [37.5, 36.25], [11.875, 50], [49.25, 49], [71, 78.75], [85.25, 37], [67.75, 17], [73.44, 48.271], [47.313, 85.25], [28, 64.875]],
        [[35.875, 94.125], [27.75, 19.5], [61.375, 29.5], [11.875, 50], [55.875, 35], [71, 78.75], [85.25, 37], [67.75, 17], [75.375, 48.75], [47.313, 85.25], [47.75, 54.5]],
        [[65.625, 6.125], [27.75, 19.5], [61.375, 29.5], [11.875, 50], [68, 80.25], [86.5, 38], [71.375, 23.875], [63.25, 58.75], [40.875, 51.625], [42.75, 88], [23.125, 67.375]],
        [[90.875, 78.625], [27.75, 19.5], [60.25, 15.375], [11.875, 42.5], [68, 80.25], [86.5, 38], [71.375, 23.875], [54.375, 61.375], [32.875, 46.75], [42.75, 88], [23.125, 67.375]],
        [[62.625, 97], [36.75, 20.625], [69.25, 16.5], [54.375, 22.125], [68, 80.25], [86.5, 38], [82.625, 43.25], [27.25, 57.25], [27.375, 82.125], [15.125, 57.875], [22.875, 34.5]],
        [[92.75, 69.875], [13.625, 47.875], [37.875, 17], [66.5, 19.625], [56.625, 86.125], [84.828, 36.875], [79.625, 33.375], [40, 86.875], [23.125, 76.5], [15.125, 57.875], [47.25, 37.5]],
        [[92.75, 69.875], [20.125, 66.25], [16.25, 60.125], [15.5, 42.5], [26.375, 24.25], [46.875, 14.375], [69.625, 20.875], [84.75, 48.625], [43.375, 83.625], [38.35, 80.743], [47.625, 44.125]],
        [[95.45, 66], [20.125, 66.25], [16.25, 60.125], [34, 58.25], [26.375, 24.25], [65.5, 83.625], [69.625, 20.875], [71.875, 51.75], [43.375, 83.625], [38.35, 80.743], [47.75, 15.625]],
        [[95.45, 66], [20.125, 66.25], [16.25, 60.125], [34, 58.25], [16.25, 47.125], [56.375, 47], [69.625, 20.875], [84.75, 59.625], [63.625, 59.625], [47.875, 89], [47.75, 15.625]],
        [[95.45, 55.375], [20.125, 66.25], [41.375, 40.75], [41.375, 47.047], [16.25, 47.125], [52.751, 47.011], [51.625, 35], [75.875, 25.75], [63.625, 59.625], [51.885, 83.654], [43.875, 17.75]],
        [[97.125, 51], [20.125, 66.25], [44.625, 40.75], [48.875, 12.75], [14.375, 44.75], [49.039, 51.562], [44.625, 40.75], [75.875, 25.75], [83.625, 40.5], [52.25, 86.625], [38.625, 77.25]],
        [[79.5, 10.25], [20.398, 69.309], [32.517, 27.923], [48.875, 12.75], [14.375, 44.75], [57, 38.5], [48.875, 37.5], [75.875, 25.75], [69.5, 77.25], [35.063, 80.375], [56.938, 57.5]],
        [[79.5, 10.25], [20.398, 69.309], [51.177, 38.552], [48.875, 12.75], [27.75, 33.875], [60.5, 36.625], [43.375, 39.125], [75.875, 25.75], [63.469, 76.661], [68.25, 79.75], [17.75, 47.125]],
        [[79.5, 10.25], [19.625, 71.875], [82.375, 45], [52, 14], [28.625, 24.625], [66, 40.625], [31.25, 44.125], [53.75, 69.375], [79.25, 58.25], [52.5, 85.375], [15.625, 44.25]],
        [[51.25, 2.375], [46.625, 89], [81.477, 46.106], [30, 21.125], [27.75, 25.625], [64.908, 43.695], [61.482, 49.125], [28.5, 33.125], [81.477, 58.875], [57.875, 86.5], [24.75, 57.75]],
        [[18.5, 8.375], [22.375, 71.875], [34.5, 13.875], [40.5, 14.25], [28.375, 73.25], [65.39, 41.936], [60.5, 51.25], [65.25, 16], [83.583, 71.625], [52.625, 86.5], [57.75, 63.75]],
        [[2, 72], [22, 72], [16, 46], [52, 14], [14, 38], [64, 28], [24, 48], [65.25, 16], [86, 54], [52, 86], [52, 58]],
        [[4, 64], [22, 72], [14, 60], [60, 18], [26, 28], [38, 62], [60, 18], [82, 42], [74, 74], [40, 84], [64, 50]],
        [[6, 68], [50, 68], [16, 58], [44, 14], [16, 42], [26, 50], [54, 14], [84, 58], [84, 38], [50, 82], [50, 50]],
        [[6, 66], [20, 60], [16, 58], [44, 20], [36, 20], [34, 68], [26.625, 22.375], [64.625, 58.375], [50, 84], [44, 82], [74, 28]],
        [[2, 50], [12, 50], [20, 34], [26, 68], [32, 20], [38, 82], [48, 10], [56, 88], [64, 16], [74, 76], [84, 40]],
        [[10, 24], [28, 24], [20, 60], [56, 78], [34, 36], [78, 36], [66, 56], [58, 20], [36, 60], [71.375, 79.25], [80, 64]],
        [[4, 36], [22, 36], [22, 64], [56, 86], [56, 24], [78, 36], [62, 14], [30, 16], [30, 52], [78, 64], [78, 44]],
        [[4, 36], [22, 36], [22, 64], [56, 64], [56, 24], [38, 32], [38, 16], [30, 16], [30, 84], [78, 64], [78, 28]],
        [[8, 76], [16, 36], [68, 54], [44, 66], [56, 24], [40, 20], [38, 16], [38, 16], [30, 82], [86, 62], [68, 32]],
        [[98, 72], [16, 36], [70, 46], [74, 18], [66, 32], [34, 18], [42, 28], [28, 20], [30, 82], [56, 88], [56, 74]],
        [[86, 82], [82, 72], [36, 80], [74, 18], [70, 58], [26, 28], [40, 18], [16, 44], [26, 54], [18, 58], [56, 14]],
        [[96, 62], [82, 62], [82, 72], [70, 72], [70, 58], [64, 58], [64, 72], [26, 22], [26, 78], [16, 50], [70, 20]],
        [[96, 50], [82, 50], [82, 72], [70, 72], [60, 14], [78, 28], [32, 82], [60, 14], [26, 50], [20, 50], [20, 28]],
        [[74, 94], [82, 50], [62, 78], [70, 72], [44, 14], [82, 40], [58, 70], [34, 16], [52, 84], [18, 64], [32, 48]],
        [[98, 50], [16, 52], [70, 78], [60, 22], [64, 18], [80, 32], [52, 74], [60, 78], [52, 84], [18, 64], [40, 20]],
        [[98, 52], [74, 52], [74, 38], [42, 22], [64, 18], [64, 84], [64, 20], [68, 22], [54, 64], [22, 64], [22, 40]],
        [[10, 78], [22, 70], [42, 86], [34, 16], [12, 46], [82, 70], [54, 76], [88, 48], [66, 50], [50, 46], [48, 18], [68, 34], [78, 26]],
        [[18, 16], [32, 60], [48, 32], [14, 48], [34, 80], [50, 56], [56, 86], [66, 42], [88, 60], [78, 68], [76, 26], [56, 36], [56, 14]],
        [[4, 70], [32, 78], [12, 42], [52, 84], [44, 14], [22, 26], [76, 26], [30, 44], [80, 74], [66, 48], [84, 40]],
        [[10, 26], [30, 42], [18, 58], [64, 78], [34, 86], [44, 14], [74, 80], [86, 42], [44, 56], [70, 28]],
        [[10, 26], [28, 26], [18, 58], [58, 70], [34, 86], [44, 14], [74, 80], [86, 42], [38, 58], [74, 46], [72, 26]],
        [[10, 26], [36, 16], [54, 42], [64, 22], [82, 46], [62, 58], [68, 78], [42, 80], [44, 64], [18, 60], [34, 38]],
        [[10, 26], [40, 20], [74, 64], [48, 18], [84, 42], [62, 58], [68, 78], [42, 80], [44, 64], [30, 68], [30, 40]],
        [[10, 26], [40, 20], [74, 64], [20, 38], [84, 42], [62, 58], [68, 78], [42, 80], [44, 64], [30, 68], [72, 22]],
        [[78, 8], [40, 20], [60, 56], [16, 42], [26, 32], [78, 32], [68, 78], [42, 80], [44, 64], [30.125, 80.5], [22, 62]],
        [[16, 10], [78, 32], [68, 54], [20, 60], [20, 50], [82, 42], [68, 78], [42, 80], [44, 64], [30, 76], [34, 28]],
        [[16, 10], [60, 64], [75.25, 37.75], [58, 38], [80, 30], [82, 42], [68, 78], [40, 84], [44, 64], [16, 44], [58, 20]],
        [[16, 10], [76, 78], [56, 18], [70, 22], [82, 36], [72, 36], [44, 86], [40, 84], [44, 64], [24, 76], [24, 44]],
        [[16, 10], [38, 26], [56, 18], [70, 22], [82, 36], [72, 36], [74, 72], [40, 84], [70, 22], [24, 76], [24, 44]],
        [[16, 10], [38, 26], [56, 18], [38, 38], [84, 44], [66, 20], [70, 74], [40, 84], [58, 52], [24, 76], [20, 48]],
        [[16, 10], [38, 26], [64, 18], [38, 38], [84, 44], [42, 72], [74, 76], [56, 52], [40, 50], [26, 76], [20, 42]],
        [[16, 10], [36, 18], [52, 46], [48, 12], [84, 44], [36, 80], [74, 76], [68, 46], [38, 38], [34, 64], [18, 58]],
        [[16, 10], [36, 18], [58, 38], [52, 60], [82, 44], [36, 80], [74, 76], [74, 22], [32, 30], [36, 80], [16, 42]],
        [[16, 10], [34, 18], [58, 44], [76, 28], [82, 44], [30, 80], [76, 74], [16, 60], [24, 32], [42, 52], [60, 14]],
        [[16, 10], [34, 18], [60, 20], [86, 66], [78, 32], [48, 84], [22, 66], [34, 68], [22, 32], [38, 56], [50, 34]],
        [[16, 10], [54, 10], [54, 16], [66, 16], [86, 36], [48, 84], [14, 56], [34, 56], [34, 40], [54, 40], [54, 24]],
        [[4, 64], [20, 28], [34, 16], [66, 16], [86, 36], [62, 70], [26, 64], [26, 76], [76, 76], [66, 48], [36, 32]],
        [[4, 64], [38, 50], [46, 18], [64, 20], [82, 36], [60, 64], [26, 64], [26, 76], [76, 76], [66, 48], [20, 32]],
        [[4, 64], [38, 50], [46, 18], [64, 20], [14, 36], [60, 64], [22, 64], [40, 76], [76, 76], [66, 48], [78, 26]],
        [[4, 64], [44, 16], [50, 14], [74, 24], [36, 46], [44, 64], [22, 64], [40, 76], [76, 76], [52, 48], [84, 46]],
        [[10, 90], [26, 30], [50, 14], [74, 24], [26, 74], [18, 62], [46, 30], [56, 50], [54, 86], [70, 56], [84, 46]],
        [[12, 82], [26, 30], [50, 14], [64, 56], [30, 68], [30, 62], [44, 32], [40, 56], [54, 86], [80, 60], [70, 24]],
        [[12, 82], [24, 24], [50, 14], [64, 56], [30, 68], [30, 62], [80, 32], [40, 56], [52, 82], [80, 60], [42, 30]],
        [[12, 82], [24, 24], [50, 14], [54, 58], [30, 42], [66, 26], [76, 38], [52, 72], [28, 72], [52, 82], [80, 72], [80, 58]],
        [[24, 90], [24, 24], [50, 14], [48, 58], [34, 40], [66, 26], [72, 26], [48, 78], [68, 78], [68, 68], [80, 68], [80, 46]],
        [[24, 90], [24, 24], [50, 24], [48, 52], [38, 40], [38, 24], [76, 24], [48, 52], [68, 76], [68, 68], [78, 68], [78, 46]],
        [[24, 90], [24, 30], [48, 12], [48, 56], [38, 66], [38, 30], [76, 30], [48, 56], [48, 84], [62, 72], [78, 72], [78, 50]],
        [[24, 90], [60, 24], [48, 12], [68.5, 61.875], [14, 56], [24, 30], [76, 30], [56, 30], [48, 84], [62, 72], [78, 74], [78, 36]],
        [[24, 90], [74, 26], [54, 18], [50, 44], [14, 56], [24, 30], [42, 18], [28, 42], [48, 84], [62, 72], [78, 74], [72, 52]],
        [[24, 90], [56, 38], [42, 40], [24, 70], [14, 56], [24, 30], [48, 16], [76, 30], [82, 62], [68, 82], [50, 78], [64, 54]],
        [[24, 90], [24, 50], [40, 44], [24, 70], [12, 44], [24, 30], [50, 38], [76, 30], [82, 62], [68, 76], [50, 78], [50, 14]],
        [[24, 90], [30, 46], [40, 44], [38, 72], [12, 44], [24, 30], [50, 38], [74, 20], [82, 62], [42, 86], [66, 52], [50, 14]],
        [[40, 2], [30, 50], [40, 44], [38, 72], [16, 62], [20, 28], [50, 38], [78, 26], [76, 74], [42, 86], [66, 52], [56, 14]],
        [[40, 2], [30, 50], [40, 44], [40, 76], [20, 62], [20, 28], [50, 16], [78, 26], [78, 74], [42, 86], [62, 72], [56, 34]],
        [[40, 2], [30, 50], [14, 50], [38, 74], [46, 50], [20, 28], [72, 20], [79.875, 38.5], [78, 70], [42, 86], [62, 72], [56, 34]],
        [[40, 2], [28, 80], [14, 50], [36, 50], [60, 32], [20, 28], [60, 16], [79.875, 38.5], [78, 70], [42, 86], [62, 72], [52, 52]],
        [[34, 2], [28, 80], [14, 50], [46, 18], [62, 24], [56, 12], [76, 24], [76, 74], [48, 86], [42, 72], [60, 68], [50, 38]],
        [[94, 30], [28, 80], [14, 50], [34, 20], [62, 24], [56, 12], [76, 24], [76, 74], [48, 86], [60, 72], [58, 36], [38, 62], [38, 34]],
        [[94, 30], [28, 80], [14, 50], [48, 38], [62, 24], [56, 12], [76, 24], [58, 86], [48, 86], [52, 80], [42, 56], [38, 62], [34, 22]],
        [[94, 72], [26, 72], [26, 24], [60, 24], [60, 18], [70, 18], [68, 64], [56, 84], [46, 84], [46, 72], [34, 60], [48, 60], [48, 34]],
        [[60, 98], [26, 72], [24, 26], [32, 42], [42, 32], [76, 32], [76, 64], [56, 84], [48, 78], [48, 68], [18, 58], [58, 60], [58, 14]],
        [[31.875, 96], [18, 46], [30, 54], [26, 28], [44, 46], [74, 24], [78, 70], [52, 80], [38, 78], [52, 66], [38, 62], [58, 46], [50, 16]],
        [[6, 28], [50, 14], [50, 40], [80, 28], [80, 42], [26, 68], [26, 76], [68, 56], [68, 82], [42, 82], [42, 46], [26, 52], [26, 32]],
        [[6, 28], [64, 18], [56, 36], [80, 28], [56, 54], [66, 56], [56, 72], [86, 46], [68, 82], [42, 82], [40, 16], [26, 72], [16, 42]],
        [[8, 28], [58, 14], [60, 30], [76, 38], [46, 54], [58, 68], [44, 66], [86, 46], [56, 84], [16, 58], [38, 84], [18, 38], [48, 38]],
        [[2, 46], [58, 14], [60, 30], [86, 46], [58, 60], [68, 68], [42, 66], [86, 46], [56, 84], [18, 38], [38, 84], [18, 38], [48, 42]],
        [[2, 46], [58, 14], [60, 30], [86, 46], [58, 60], [68, 68], [42, 66], [86, 46], [56, 84], [18, 38], [38, 84], [18, 38], [54, 34]],
        [[8, 70], [58, 14], [60, 30], [82, 34], [58, 60], [52, 52], [56, 42], [86, 46], [56, 84], [50, 68], [26, 76], [44, 40], [22, 28]],
        [[86, 88], [78, 26], [48, 40], [66, 46], [58, 60], [36, 58], [58, 52], [70, 60], [56, 84], [42, 70], [26, 76], [18, 38], [44, 16]],
        [[80, 14], [48, 28], [62, 34], [56, 48], [80, 38], [72, 64], [64, 80], [42, 44], [42, 82], [32, 72], [26, 76], [20, 62], [34, 18]],
        [[80, 14], [42, 20], [62, 38], [54, 70], [80, 32], [80, 64], [64, 80], [54, 70], [42, 82], [42, 20], [20, 68], [34, 64], [18, 32]],
        [[80, 14], [58, 14], [58, 34], [48, 34], [48, 22], [70, 22], [70, 80], [54, 80], [54, 50], [22, 28], [46, 68], [34, 76], [16, 48]],
        [[84, 84], [60, 44], [60, 34], [48, 34], [48, 22], [70, 22], [70, 76], [60, 76], [28, 24], [22, 28], [46, 68], [34, 76], [16, 48]],
        [[8, 88], [64, 52], [26, 38], [36, 22], [54, 16], [72, 24], [82, 38.5], [82, 58.5], [72, 72], [62, 78], [46, 80], [22, 64], [38, 54]],
        [[8, 88], [18, 50], [26, 76], [50, 58], [46, 14], [86, 50], [66, 54], [82, 66], [64.5, 78], [36.5, 82], [32, 64], [28, 22], [76, 20]],
        [[4, 50], [18, 50], [26, 76], [26, 40], [34, 26], [84, 38], [66, 54], [82, 66], [64.5, 78], [36.5, 82], [36, 64], [56, 64], [56, 14]],
        [[4, 50], [18, 50], [26, 76], [26, 40], [36, 62], [40, 16], [48, 58], [82, 66], [64.5, 78], [36.5, 82], [80, 54], [58, 44], [68, 20]],
        [[6, 82], [18, 36], [26, 68], [30, 50], [36, 62], [40, 12], [48, 88], [56, 64], [65.25, 80], [72, 28], [88, 44], [78, 66], [54, 32]],
        [[24, 94], [18, 36], [20, 56], [30, 50], [38, 76], [62, 26], [38, 76], [56, 64], [65.25, 80], [72, 28], [84, 44], [82, 62], [30, 20]]
    ];

    let d = 500,
        h = 500,
        adj = (d - h) / 2,
        r = d / 2 - adj,
        centerX = d / 2,
        centerY = h / 2,
        k = d / 10,
        generativeTreshold = 0.8;

    let svg = d3.select("#featured-svg")
        .attr("viewBox", "0 0 " + d + " " + h);

    let randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let drawIdentity = function () {

        svg.selectAll("*").remove();
        let g = svg.append("g");

        let dt = {},
            reflectX = false, //(Math.random() > 0.5),
            currentDots = [],
            ranLen = randomInt(5, 15),
            secs = 200,
            delay = 400;

        let set = {
            x: function (valueX) {
                if (reflectX) {
                    return d - (valueX / 100) * d;
                } else {
                    return (valueX / 100) * d;
                }
            },
            y: function (valueY) {
                return (valueY / 100) * d - adj;
            }
        };

        let detectIntercept = function (r, cx, cy, x1, x2, y1, y2) {
            let b, c, d,
                v1 = {},
                v2 = {};
            v1.x = x2 - x1;
            v1.y = y2 - y1;
            v2.x = x1 - cx;
            v2.y = y1 - cy;
            b = (v1.x * v2.x + v1.y * v2.y);
            c = 2 * (v1.x * v1.x + v1.y * v1.y);
            b *= -2;
            d = Math.sqrt(b * b - 2 * c * (v2.x * v2.x + v2.y * v2.y - r * r));
            return !isNaN(d);
        };

        let drawLine = function (x1, y1, x2, y2, del) {
            g.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x1)
                .attr("y2", y1)
                .attr("visibility", "hidden")
                .transition()
                .duration(secs)
                .delay(del)
                .attr("visibility", "visible")
                .ease(d3.easeSinOut)
                .attr("x2", x2)
                .attr("y2", y2);
        };

        g.append("circle")
            .attr("cx", centerX)
            .attr("cy", centerY)
            .attr("r", r);

        var fixStartingPoint = function (point) {
            let alpha = Math.atan2(point[1], point[0]);
            let x = (r + 5) * Math.cos(alpha);
            let y = (r + 5) * Math.sin(alpha);
            return {x: x, y: y}
        };

        if (generativeTreshold > Math.random()) {

            let cleanCollisions = function (x, y) {
                let normalK = 15;
                for (let i = 1; i < ranLen - 1; i++) {
                    let x1 = currentDots[i - 1][0],
                        y1 = currentDots[i - 1][1],
                        x2 = currentDots[i][0],
                        y2 = currentDots[i][1];
                    if (detectIntercept(normalK, x, y, x1, x2, y1, y2)) {
                        return false;
                    }
                }
                return true;
            };

            let normalR = 50;
            currentDots[0] = [];
            let alpha = 2 * Math.random() * Math.PI;
            let dist = randomInt(normalR + 5, normalR + 20);
            currentDots[0][0] = dist * Math.cos(alpha) + normalR;
            currentDots[0][1] = dist * Math.sin(alpha) + normalR;

            for (let i = 1; i < ranLen - 1; i++) {
                currentDots[i] = [];
                let alpha = 2 * Math.random() * Math.PI;
                let dist = randomInt(0, normalR - 10);
                currentDots[i][0] = dist * Math.cos(alpha) + normalR;
                currentDots[i][1] = dist * Math.sin(alpha) + normalR;
            }

            let serendipityCredit = 1000;
            for (let j = 0; j < serendipityCredit; j++) {
                let alpha = 2 * Math.random() * Math.PI;
                let dist = randomInt(0, normalR - 10);
                let x = dist * Math.cos(alpha) + normalR;
                let y = dist * Math.sin(alpha) + normalR;
                if (cleanCollisions(x, y)) {
                    currentDots[ranLen - 1] = [];
                    currentDots[ranLen - 1][0] = x;
                    currentDots[ranLen - 1][1] = y;
                    break;
                }
                if (j === serendipityCredit - 1) {
                    // console.log(j + " - go with existing >>");
                    currentDots = dots[Math.floor((dots.length - 1) * Math.random())];
                    let point = fixStartingPoint(currentDots[0]);
                    currentDots[0][0] = point.x;
                    currentDots[0][1] = point.y;
                    reflectX = (Math.random() > 0.5);
                }
            }

        } else {

            currentDots = dots[Math.floor((dots.length - 1) * Math.random())];
            let point = fixStartingPoint(currentDots[0]);
            currentDots[0][0] = point.x;
            currentDots[0][1] = point.y;
            reflectX = (Math.random() > 0.5);

        }

        dt.x1 = set.x(currentDots[0][0]);
        dt.y1 = set.y(currentDots[0][1]);

        for (let i = 1; i < currentDots.length; i++) {

            dt.x2 = set.x(currentDots[i][0]);
            dt.y2 = set.y(currentDots[i][1]);

            drawLine(dt.x1, dt.y1, dt.x2, dt.y2, delay);

            if (i < currentDots.length - 1) {
                dt.x1 = dt.x2;
                dt.y1 = dt.y2;
            }
            delay = delay + secs;
        }

        let drawArrowpoints = function (dx1, dx2, dy1, dy2) {

            let c, a, beta, theta, phi;
            let x1 = dx1, x2 = dx2, y1 = dy1, y2 = dy2;
            let angle = Math.PI / 4, len = k;
            let ax1, ax2, ay1, ay2;

            c = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
            if (Math.abs(x2 - x1) < 1e-6)
                if (y2 < y1)
                    theta = Math.PI / 2;
                else
                    theta = -Math.PI / 2;
            else {
                if (x2 > x1)
                    theta = Math.atan((y1 - y2) / (x2 - x1));
                else
                    theta = Math.atan((y1 - y2) / (x1 - x2));
            }
            a = Math.sqrt(len * len + c * c - 2 * len * c * Math.cos(angle));
            beta = Math.asin(len * Math.sin(angle) / a);

            phi = theta - beta;
            ay1 = y1 - a * Math.sin(phi);
            if (x2 > x1)
                ax1 = x1 + a * Math.cos(phi);
            else
                ax1 = x1 - a * Math.cos(phi);

            phi = theta + beta;
            ay2 = y1 - a * Math.sin(phi);
            if (x2 > x1)
                ax2 = x1 + a * Math.cos(phi);
            else
                ax2 = x1 - a * Math.cos(phi);

            drawLine(dt.x2, dt.y2, ax1, ay1, delay);
            drawLine(dt.x2, dt.y2, ax2, ay2, delay);

        };

        drawArrowpoints(dt.x1, dt.x2, dt.y1, dt.y2);

    };

    drawIdentity();
    setInterval(drawIdentity, 4000);

});