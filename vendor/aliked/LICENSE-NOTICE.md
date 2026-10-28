# Licence notice

The artifacts in this repository are **derived works** combining weights and code from
three separately licensed upstream projects. Redistributing them — including
redistributing the TensorRT engines built from them — carries all three obligations.

## ALIKED — BSD-3-Clause (attribution required in binary form)

The descriptor weights originate from [`Shiaoming/ALIKED`](https://github.com/Shiaoming/ALIKED)
(`aliked-n16`), which is BSD-3-Clause. That licence requires the following notice to be
reproduced in redistributions **in binary form**, which an ONNX graph and a TensorRT engine
both are. This notice is reproduced here deliberately: it is not present in the upstream
export repository, and anything redistributing these files further must carry it too.

```
BSD 3-Clause License

Copyright (c) 2022, Zhao Xiaoming
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

## RaCo — Apache-2.0

Detector and ranker weights from [`cvg/RaCo`](https://github.com/cvg/RaCo), Apache
License 2.0. Shenoi, Lindenberger, Sarlin, Pollefeys, *"RaCo: Ranking and Covariance for
Practical Learned Keypoints"*, 3DV 2026, arXiv:2602.15755.

## LightGlue — Apache-2.0

Matcher weights from [`cvg/LightGlue`](https://github.com/cvg/LightGlue), Apache License
2.0. Lindenberger, Sarlin, Pollefeys, *"LightGlue: Local Feature Matching at Light
Speed"*, ICCV 2023.

## Export tooling — Apache-2.0

The fused ONNX these files are cut from, and the TensorRT graph optimizations they
preserve, are from [`fabio-sim/LightGlue-ONNX`](https://github.com/fabio-sim/LightGlue-ONNX),
Apache License 2.0. Copyright 2023 ETH Zurich; Copyright 2023-2026 Fabio Milentiansen Sim.

## What was changed

No weights were retrained, fine-tuned, or otherwise modified. The graph was cut into two
halves at the extractor/matcher seam and upstream of LightGlue's `NonZero` compaction,
integer index outputs were cast to int32, rank-4 padding was spliced onto the matcher's
inputs, and constant-derived `Conv` biases and `Reduce*` axes were baked into initializers
for TensorRT 10.3 compatibility. Numerical outputs are unchanged — verified against the
fused model under onnxruntime.
