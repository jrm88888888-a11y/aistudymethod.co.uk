#!/bin/bash
# ClassCraft — Nature page photo downloader (v3)
# Verifies each file is a real image before saving
# Run from repo root: bash download_nature_photos.sh

SUCCESS=0; FAIL=0; SKIP=0; I=0; TOTAL=280

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/red-squirrel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/red-squirrel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/red-squirrel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/red-squirrel.jpg (was $MIME)"
    rm -f "nature/northern-ireland/red-squirrel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Red_Squirrel_in_St_James%27s_Park%2C_London_-_Nov_2006_edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/red-squirrel.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/red-squirrel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/red-squirrel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/barn-owl.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/barn-owl.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/barn-owl.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/barn-owl.jpg (was $MIME)"
    rm -f "nature/northern-ireland/barn-owl.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Tyto_alba_-British_Wildlife_Centre%2C_Surrey%2C_England-8a_%281%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/barn-owl.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/barn-owl.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/barn-owl.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/irish-hare.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/irish-hare.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/irish-hare.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/irish-hare.jpg (was $MIME)"
    rm -f "nature/northern-ireland/irish-hare.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Mountain_Hare_%28Lepus_timidus%29_in_summer_coat.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/irish-hare.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/irish-hare.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/irish-hare.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/common-seal.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/common-seal.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/common-seal.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/common-seal.jpg (was $MIME)"
    rm -f "nature/northern-ireland/common-seal.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Phoca_vitulina_Edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/common-seal.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/common-seal.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/common-seal.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/swift.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/swift.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/swift.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/swift.jpg (was $MIME)"
    rm -f "nature/northern-ireland/swift.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/42/Common_Swift_at_Basildon.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/swift.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/swift.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/swift.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/curlew.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/curlew.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/curlew.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/curlew.jpg (was $MIME)"
    rm -f "nature/northern-ireland/curlew.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Eurasian_Curlew.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/curlew.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/curlew.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/curlew.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/peregrine.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/peregrine.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/peregrine.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/peregrine.jpg (was $MIME)"
    rm -f "nature/northern-ireland/peregrine.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Falco_peregrinus_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/peregrine.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/peregrine.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/peregrine.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/brent-goose.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/brent-goose.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/brent-goose.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/brent-goose.jpg (was $MIME)"
    rm -f "nature/northern-ireland/brent-goose.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/09/Branta_bernicla_hrota.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/brent-goose.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/brent-goose.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/brent-goose.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/red-kite.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/red-kite.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/red-kite.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/red-kite.jpg (was $MIME)"
    rm -f "nature/northern-ireland/red-kite.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Red_Kite_-_Milvus_milvus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/red-kite.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/red-kite.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/red-kite.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/common-lizard.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/common-lizard.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/common-lizard.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/common-lizard.jpg (was $MIME)"
    rm -f "nature/northern-ireland/common-lizard.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Zootoca_vivipara_bosc.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/common-lizard.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/common-lizard.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/common-lizard.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/pipistrelle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/pipistrelle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/pipistrelle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/pipistrelle.jpg (was $MIME)"
    rm -f "nature/northern-ireland/pipistrelle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Pipistrellus_pipistrellus_crop.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/pipistrelle.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/pipistrelle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/pipistrelle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/grey-heron.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/grey-heron.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/grey-heron.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/grey-heron.jpg (was $MIME)"
    rm -f "nature/northern-ireland/grey-heron.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Grey_Heron_%28Ardea_cinerea%29_in_flight_-_Hamina_-_Finland.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/grey-heron.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/grey-heron.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/grey-heron.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/hedgehog.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/hedgehog.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/hedgehog.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/hedgehog.jpg (was $MIME)"
    rm -f "nature/northern-ireland/hedgehog.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/fc/Erinaceus_europaeus_LC0124.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/hedgehog.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/hedgehog.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/hedgehog.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/arctic-tern.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/arctic-tern.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/arctic-tern.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/arctic-tern.jpg (was $MIME)"
    rm -f "nature/northern-ireland/arctic-tern.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e8/Arctic_Tern_in_flight.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/arctic-tern.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/arctic-tern.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/arctic-tern.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/water-vole.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/water-vole.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/water-vole.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/water-vole.jpg (was $MIME)"
    rm -f "nature/northern-ireland/water-vole.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/92/Water_vole.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/water-vole.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/water-vole.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/water-vole.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/bog-cotton.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/bog-cotton.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/bog-cotton.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/bog-cotton.jpg (was $MIME)"
    rm -f "nature/northern-ireland/bog-cotton.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/48/Eriophorum_angustifolium_a1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/bog-cotton.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/bog-cotton.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/bog-cotton.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/heather.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/heather.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/heather.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/heather.jpg (was $MIME)"
    rm -f "nature/northern-ireland/heather.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Calluna_vulgaris_-_harilik_kanarbik.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/heather.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/heather.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/heather.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/yellow-iris.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/yellow-iris.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/yellow-iris.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/yellow-iris.jpg (was $MIME)"
    rm -f "nature/northern-ireland/yellow-iris.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Iris_pseudacorus_-_20060527.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/yellow-iris.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/yellow-iris.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/yellow-iris.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/wood-anemone.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/wood-anemone.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/wood-anemone.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/wood-anemone.jpg (was $MIME)"
    rm -f "nature/northern-ireland/wood-anemone.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Anemone_nemorosa_LC0303.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/wood-anemone.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/wood-anemone.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/wood-anemone.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/thrift.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/thrift.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/thrift.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/thrift.jpg (was $MIME)"
    rm -f "nature/northern-ireland/thrift.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Armeria_maritima_Westkueste_Schottland.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/thrift.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/thrift.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/thrift.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/lesser-celandine.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/lesser-celandine.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/lesser-celandine.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/lesser-celandine.jpg (was $MIME)"
    rm -f "nature/northern-ireland/lesser-celandine.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a0/Ficaria_verna_LC0193.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/lesser-celandine.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/lesser-celandine.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/lesser-celandine.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/meadowsweet.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/meadowsweet.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/meadowsweet.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/meadowsweet.jpg (was $MIME)"
    rm -f "nature/northern-ireland/meadowsweet.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/75/Filipendula_ulmaria_LC0049.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/meadowsweet.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/meadowsweet.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/meadowsweet.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/cuckoo-flower.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/cuckoo-flower.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/cuckoo-flower.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/cuckoo-flower.jpg (was $MIME)"
    rm -f "nature/northern-ireland/cuckoo-flower.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Cardamine_pratensis_LC0020.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/cuckoo-flower.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/cuckoo-flower.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/cuckoo-flower.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/devils-bit-scabious.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/devils-bit-scabious.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/devils-bit-scabious.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/devils-bit-scabious.jpg (was $MIME)"
    rm -f "nature/northern-ireland/devils-bit-scabious.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Succisa_pratensis_LC0064.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/devils-bit-scabious.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/devils-bit-scabious.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/devils-bit-scabious.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/sea-holly.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/sea-holly.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/sea-holly.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/sea-holly.jpg (was $MIME)"
    rm -f "nature/northern-ireland/sea-holly.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Eryngium_maritimum_kz.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/sea-holly.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/sea-holly.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/sea-holly.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/bilberry.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/bilberry.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/bilberry.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/bilberry.jpg (was $MIME)"
    rm -f "nature/northern-ireland/bilberry.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/33/Blueberry_3148.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/bilberry.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/bilberry.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/bilberry.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/marsh-marigold.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/marsh-marigold.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/marsh-marigold.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/marsh-marigold.jpg (was $MIME)"
    rm -f "nature/northern-ireland/marsh-marigold.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Caltha_palustris_LC0074.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/marsh-marigold.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/marsh-marigold.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/marsh-marigold.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/purple-moor-grass.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/purple-moor-grass.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/purple-moor-grass.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/purple-moor-grass.jpg (was $MIME)"
    rm -f "nature/northern-ireland/purple-moor-grass.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a5/Molinia_caerulea_subsp._caerulea_kz02.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/purple-moor-grass.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/purple-moor-grass.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/purple-moor-grass.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/water-mint.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/water-mint.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/water-mint.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/water-mint.jpg (was $MIME)"
    rm -f "nature/northern-ireland/water-mint.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Mentha_aquatica_LC0292.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/water-mint.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/water-mint.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/water-mint.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/cross-leaved-heath.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/cross-leaved-heath.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/cross-leaved-heath.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/cross-leaved-heath.jpg (was $MIME)"
    rm -f "nature/northern-ireland/cross-leaved-heath.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Erica_tetralix_a2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/cross-leaved-heath.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/cross-leaved-heath.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/cross-leaved-heath.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/fly-agaric.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/fly-agaric.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/fly-agaric.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/fly-agaric.jpg (was $MIME)"
    rm -f "nature/northern-ireland/fly-agaric.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/fly-agaric.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/fly-agaric.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/fly-agaric.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/giant-puffball.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/giant-puffball.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/giant-puffball.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/giant-puffball.jpg (was $MIME)"
    rm -f "nature/northern-ireland/giant-puffball.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Calvatia.gigantea.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/giant-puffball.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/giant-puffball.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/giant-puffball.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/oyster-mushroom.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/oyster-mushroom.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/oyster-mushroom.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/oyster-mushroom.jpg (was $MIME)"
    rm -f "nature/northern-ireland/oyster-mushroom.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Oyster_mushroom_%28Pleurotus_ostreatus%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/oyster-mushroom.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/oyster-mushroom.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/oyster-mushroom.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/waxcap.jpg (was $MIME)"
    rm -f "nature/northern-ireland/waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cuphophyllus_pratensis_%28Fr.%29_Bon_%281989%29_%2836093671285%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/blackening-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/blackening-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/blackening-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/blackening-waxcap.jpg (was $MIME)"
    rm -f "nature/northern-ireland/blackening-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Hygrocybe_conica_2009_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/blackening-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/blackening-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/blackening-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/honey-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/honey-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/honey-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/honey-fungus.jpg (was $MIME)"
    rm -f "nature/northern-ireland/honey-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/74/Armillaria_mellea_2012_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/honey-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/honey-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/honey-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/velvet-shank.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/velvet-shank.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/velvet-shank.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/velvet-shank.jpg (was $MIME)"
    rm -f "nature/northern-ireland/velvet-shank.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Flammulina_velutipes_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/velvet-shank.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/velvet-shank.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/velvet-shank.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/turkey-tail.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/turkey-tail.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/turkey-tail.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/turkey-tail.jpg (was $MIME)"
    rm -f "nature/northern-ireland/turkey-tail.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Trametes_versicolor_-_Turkey_Tail.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/turkey-tail.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/turkey-tail.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/turkey-tail.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/earthball.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/earthball.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/earthball.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/earthball.jpg (was $MIME)"
    rm -f "nature/northern-ireland/earthball.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Scleroderma_citrinum_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/earthball.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/earthball.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/earthball.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/northern-ireland"
if [ -f "nature/northern-ireland/jelly-ear.jpg" ]; then
  MIME=$(file --mime-type -b "nature/northern-ireland/jelly-ear.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/northern-ireland/jelly-ear.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/northern-ireland/jelly-ear.jpg (was $MIME)"
    rm -f "nature/northern-ireland/jelly-ear.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Auricularia_auricula-judae_2012_G4.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/northern-ireland/jelly-ear.jpg"
  echo "[$I/$TOTAL] OK    nature/northern-ireland/jelly-ear.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/northern-ireland/jelly-ear.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/red-deer.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/red-deer.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/red-deer.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/red-deer.jpg (was $MIME)"
    rm -f "nature/scotland/red-deer.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/13/2006_RedDeer_Petrozavodsk.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/red-deer.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/red-deer.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/red-deer.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/golden-eagle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/golden-eagle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/golden-eagle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/golden-eagle.jpg (was $MIME)"
    rm -f "nature/scotland/golden-eagle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/1a/Golden_eagle_in_flight_-_5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/golden-eagle.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/golden-eagle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/golden-eagle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/osprey.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/osprey.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/osprey.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/osprey.jpg (was $MIME)"
    rm -f "nature/scotland/osprey.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Osprey_in_flight_%28Andrew_Reding%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/osprey.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/osprey.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/osprey.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/pine-marten.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/pine-marten.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/pine-marten.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/pine-marten.jpg (was $MIME)"
    rm -f "nature/scotland/pine-marten.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Martes_martes-0107.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/pine-marten.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/pine-marten.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/pine-marten.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/puffin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/puffin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/puffin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/puffin.jpg (was $MIME)"
    rm -f "nature/scotland/puffin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Atlantic_puffin_42.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/puffin.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/puffin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/puffin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/capercaillie.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/capercaillie.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/capercaillie.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/capercaillie.jpg (was $MIME)"
    rm -f "nature/scotland/capercaillie.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Tetrao_urogallus_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/capercaillie.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/capercaillie.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/capercaillie.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/red-grouse.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/red-grouse.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/red-grouse.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/red-grouse.jpg (was $MIME)"
    rm -f "nature/scotland/red-grouse.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/RedGrouse.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/red-grouse.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/red-grouse.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/red-grouse.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/scottish-wildcat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/scottish-wildcat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/scottish-wildcat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/scottish-wildcat.jpg (was $MIME)"
    rm -f "nature/scotland/scottish-wildcat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3b/Scottish_Wildcat_Scottish_Wildlife_Park.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/scottish-wildcat.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/scottish-wildcat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/scottish-wildcat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/red-squirrel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/red-squirrel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/red-squirrel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/red-squirrel.jpg (was $MIME)"
    rm -f "nature/scotland/red-squirrel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Red_Squirrel_in_St_James%27s_Park%2C_London_-_Nov_2006_edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/red-squirrel.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/red-squirrel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/red-squirrel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/minke-whale.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/minke-whale.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/minke-whale.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/minke-whale.jpg (was $MIME)"
    rm -f "nature/scotland/minke-whale.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/f9/Minke_Whale_%28NOAA%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/minke-whale.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/minke-whale.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/minke-whale.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/bottlenose-dolphin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/bottlenose-dolphin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/bottlenose-dolphin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/bottlenose-dolphin.jpg (was $MIME)"
    rm -f "nature/scotland/bottlenose-dolphin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Tursiops_truncatus_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/bottlenose-dolphin.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/bottlenose-dolphin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/bottlenose-dolphin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/mountain-hare.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/mountain-hare.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/mountain-hare.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/mountain-hare.jpg (was $MIME)"
    rm -f "nature/scotland/mountain-hare.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Mountain_Hare_%28Lepus_timidus%29_in_summer_coat.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/mountain-hare.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/mountain-hare.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/mountain-hare.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/common-lizard.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/common-lizard.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/common-lizard.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/common-lizard.jpg (was $MIME)"
    rm -f "nature/scotland/common-lizard.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Zootoca_vivipara_bosc.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/common-lizard.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/common-lizard.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/common-lizard.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/ptarmigan.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/ptarmigan.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/ptarmigan.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/ptarmigan.jpg (was $MIME)"
    rm -f "nature/scotland/ptarmigan.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/21/Ptarmigan_%28Lagopus_muta%29_in_summer_plumage_-_cropped.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/ptarmigan.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/ptarmigan.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/ptarmigan.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/atlantic-salmon.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/atlantic-salmon.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/atlantic-salmon.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/atlantic-salmon.jpg (was $MIME)"
    rm -f "nature/scotland/atlantic-salmon.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Atlantic_salmon_%28Salmo_salar%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/atlantic-salmon.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/atlantic-salmon.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/atlantic-salmon.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/scots-pine.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/scots-pine.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/scots-pine.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/scots-pine.jpg (was $MIME)"
    rm -f "nature/scotland/scots-pine.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3e/Scots_Pine_Pinus_sylvestris_Loch_Broom_Highlands.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/scots-pine.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/scots-pine.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/scots-pine.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/bluebell.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/bluebell.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/bluebell.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/bluebell.jpg (was $MIME)"
    rm -f "nature/scotland/bluebell.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Bluebell_-_geograph.org.uk_-_1412360.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/bluebell.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/bluebell.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/bluebell.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/sundew.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/sundew.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/sundew.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/sundew.jpg (was $MIME)"
    rm -f "nature/scotland/sundew.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/45/Drosera_rotundifolia_Scawen_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/sundew.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/sundew.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/sundew.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/rowan.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/rowan.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/rowan.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/rowan.jpg (was $MIME)"
    rm -f "nature/scotland/rowan.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Rowan_Sorbus_aucuparia_Beeren.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/rowan.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/rowan.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/rowan.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/bog-myrtle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/bog-myrtle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/bog-myrtle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/bog-myrtle.jpg (was $MIME)"
    rm -f "nature/scotland/bog-myrtle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b3/Myrica_gale_-_bog_myrtle.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/bog-myrtle.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/bog-myrtle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/bog-myrtle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/mountain-avens.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/mountain-avens.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/mountain-avens.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/mountain-avens.jpg (was $MIME)"
    rm -f "nature/scotland/mountain-avens.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Dryas_octopetala_a1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/mountain-avens.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/mountain-avens.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/mountain-avens.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/common-reed.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/common-reed.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/common-reed.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/common-reed.jpg (was $MIME)"
    rm -f "nature/scotland/common-reed.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7f/Phragmites_australis_Biebrza.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/common-reed.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/common-reed.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/common-reed.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/purple-loosestrife.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/purple-loosestrife.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/purple-loosestrife.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/purple-loosestrife.jpg (was $MIME)"
    rm -f "nature/scotland/purple-loosestrife.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Lythrum_salicaria_LC0233.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/purple-loosestrife.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/purple-loosestrife.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/purple-loosestrife.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/tormentil.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/tormentil.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/tormentil.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/tormentil.jpg (was $MIME)"
    rm -f "nature/scotland/tormentil.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Potentilla_erecta_LC0064.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/tormentil.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/tormentil.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/tormentil.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/crowberry.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/crowberry.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/crowberry.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/crowberry.jpg (was $MIME)"
    rm -f "nature/scotland/crowberry.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Empetrum_nigrum1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/crowberry.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/crowberry.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/crowberry.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/cross-leaved-heath.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/cross-leaved-heath.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/cross-leaved-heath.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/cross-leaved-heath.jpg (was $MIME)"
    rm -f "nature/scotland/cross-leaved-heath.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Erica_tetralix_a2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/cross-leaved-heath.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/cross-leaved-heath.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/cross-leaved-heath.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/alpine-lady-fern.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/alpine-lady-fern.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/alpine-lady-fern.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/alpine-lady-fern.jpg (was $MIME)"
    rm -f "nature/scotland/alpine-lady-fern.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/Athyrium_distentifolium_a.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/alpine-lady-fern.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/alpine-lady-fern.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/alpine-lady-fern.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/wood-sorrel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/wood-sorrel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/wood-sorrel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/wood-sorrel.jpg (was $MIME)"
    rm -f "nature/scotland/wood-sorrel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/60/Oxalis_acetosella_LC0101.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/wood-sorrel.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/wood-sorrel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/wood-sorrel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/lesser-twayblade.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/lesser-twayblade.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/lesser-twayblade.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/lesser-twayblade.jpg (was $MIME)"
    rm -f "nature/scotland/lesser-twayblade.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Neottia_cordata_060704.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/lesser-twayblade.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/lesser-twayblade.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/lesser-twayblade.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/goldenrod.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/goldenrod.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/goldenrod.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/goldenrod.jpg (was $MIME)"
    rm -f "nature/scotland/goldenrod.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/6f/Solidago_virgaurea_LC0278.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/goldenrod.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/goldenrod.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/goldenrod.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/chanterelle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/chanterelle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/chanterelle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/chanterelle.jpg (was $MIME)"
    rm -f "nature/scotland/chanterelle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Golden_Chanterelle.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/chanterelle.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/chanterelle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/chanterelle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/birch-polypore.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/birch-polypore.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/birch-polypore.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/birch-polypore.jpg (was $MIME)"
    rm -f "nature/scotland/birch-polypore.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/86/Birch_Polypore_edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/birch-polypore.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/birch-polypore.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/birch-polypore.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/amethyst-deceiver.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/amethyst-deceiver.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/amethyst-deceiver.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/amethyst-deceiver.jpg (was $MIME)"
    rm -f "nature/scotland/amethyst-deceiver.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/2009-10-11_Laccaria_amethystina_%28Huds.%29_Cooke_58993.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/amethyst-deceiver.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/amethyst-deceiver.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/amethyst-deceiver.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/birch-bolete.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/birch-bolete.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/birch-bolete.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/birch-bolete.jpg (was $MIME)"
    rm -f "nature/scotland/birch-bolete.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/6d/Leccinum_scabrum_-_Rough-stemmed_Bolete.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/birch-bolete.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/birch-bolete.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/birch-bolete.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/parrot-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/parrot-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/parrot-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/parrot-waxcap.jpg (was $MIME)"
    rm -f "nature/scotland/parrot-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/Gliophorus_psittacinus_2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/parrot-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/parrot-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/parrot-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/sulphur-tuft.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/sulphur-tuft.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/sulphur-tuft.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/sulphur-tuft.jpg (was $MIME)"
    rm -f "nature/scotland/sulphur-tuft.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Hypholoma_fasciculare_2009_G6.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/sulphur-tuft.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/sulphur-tuft.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/sulphur-tuft.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/hedgehog-mushroom.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/hedgehog-mushroom.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/hedgehog-mushroom.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/hedgehog-mushroom.jpg (was $MIME)"
    rm -f "nature/scotland/hedgehog-mushroom.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c0/Hydnum_repandum_2012_G3.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/hedgehog-mushroom.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/hedgehog-mushroom.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/hedgehog-mushroom.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/velvet-bolete.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/velvet-bolete.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/velvet-bolete.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/velvet-bolete.jpg (was $MIME)"
    rm -f "nature/scotland/velvet-bolete.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Suillus_variegatus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/velvet-bolete.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/velvet-bolete.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/velvet-bolete.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/woolly-milkcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/woolly-milkcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/woolly-milkcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/woolly-milkcap.jpg (was $MIME)"
    rm -f "nature/scotland/woolly-milkcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a2/Lactarius_torminosus_2009_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/woolly-milkcap.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/woolly-milkcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/woolly-milkcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/scotland"
if [ -f "nature/scotland/pine-spike.jpg" ]; then
  MIME=$(file --mime-type -b "nature/scotland/pine-spike.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/scotland/pine-spike.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/scotland/pine-spike.jpg (was $MIME)"
    rm -f "nature/scotland/pine-spike.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Gomphidius_rutilus_%28Chroogomphus_rutilus%29_2009_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/scotland/pine-spike.jpg"
  echo "[$I/$TOTAL] OK    nature/scotland/pine-spike.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/scotland/pine-spike.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/white-tailed-eagle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/white-tailed-eagle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/white-tailed-eagle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/white-tailed-eagle.jpg (was $MIME)"
    rm -f "nature/republic-ireland/white-tailed-eagle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Haliaeetus_albicilla_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/white-tailed-eagle.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/white-tailed-eagle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/white-tailed-eagle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/atlantic-salmon.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/atlantic-salmon.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/atlantic-salmon.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/atlantic-salmon.jpg (was $MIME)"
    rm -f "nature/republic-ireland/atlantic-salmon.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Atlantic_salmon_%28Salmo_salar%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/atlantic-salmon.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/atlantic-salmon.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/atlantic-salmon.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/otter.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/otter.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/otter.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/otter.jpg (was $MIME)"
    rm -f "nature/republic-ireland/otter.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Fischotter%2C_Lutra_Lutra.JPG"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/otter.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/otter.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/otter.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/corncrake.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/corncrake.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/corncrake.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/corncrake.jpg (was $MIME)"
    rm -f "nature/republic-ireland/corncrake.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/58/Corncrake_Crex_crex.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/corncrake.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/corncrake.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/corncrake.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/grey-seal.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/grey-seal.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/grey-seal.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/grey-seal.jpg (was $MIME)"
    rm -f "nature/republic-ireland/grey-seal.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Grey_seal_%28Halichoerus_grypus%29_2014.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/grey-seal.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/grey-seal.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/grey-seal.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/red-fox.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/red-fox.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/red-fox.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/red-fox.jpg (was $MIME)"
    rm -f "nature/republic-ireland/red-fox.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Vulpes_vulpes_ssp_fulvus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/red-fox.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/red-fox.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/red-fox.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/badger.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/badger.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/badger.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/badger.jpg (was $MIME)"
    rm -f "nature/republic-ireland/badger.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/dc/Badger-badger.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/badger.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/badger.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/badger.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/painted-lady.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/painted-lady.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/painted-lady.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/painted-lady.jpg (was $MIME)"
    rm -f "nature/republic-ireland/painted-lady.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/83/Painted_lady_%28Vanessa_cardui%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/painted-lady.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/painted-lady.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/painted-lady.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/harbour-porpoise.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/harbour-porpoise.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/harbour-porpoise.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/harbour-porpoise.jpg (was $MIME)"
    rm -f "nature/republic-ireland/harbour-porpoise.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Harbour_porpoise.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/harbour-porpoise.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/harbour-porpoise.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/harbour-porpoise.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/red-kite.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/red-kite.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/red-kite.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/red-kite.jpg (was $MIME)"
    rm -f "nature/republic-ireland/red-kite.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Red_Kite_-_Milvus_milvus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/red-kite.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/red-kite.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/red-kite.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/common-frog.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/common-frog.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/common-frog.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/common-frog.jpg (was $MIME)"
    rm -f "nature/republic-ireland/common-frog.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Rana_temporaria.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/common-frog.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/common-frog.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/common-frog.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/swallow.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/swallow.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/swallow.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/swallow.jpg (was $MIME)"
    rm -f "nature/republic-ireland/swallow.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Hirundo_rustica_-Flickr_-_Lip_Kee.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/swallow.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/swallow.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/swallow.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/pine-marten.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/pine-marten.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/pine-marten.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/pine-marten.jpg (was $MIME)"
    rm -f "nature/republic-ireland/pine-marten.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Martes_martes-0107.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/pine-marten.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/pine-marten.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/pine-marten.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/whooper-swan.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/whooper-swan.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/whooper-swan.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/whooper-swan.jpg (was $MIME)"
    rm -f "nature/republic-ireland/whooper-swan.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Whooper_Swans_-_geograph.org.uk_-_1008059.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/whooper-swan.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/whooper-swan.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/whooper-swan.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/basking-shark.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/basking-shark.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/basking-shark.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/basking-shark.jpg (was $MIME)"
    rm -f "nature/republic-ireland/basking-shark.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/1b/Cetorhinus_maximus_by_greg_skomal.JPG"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/basking-shark.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/basking-shark.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/basking-shark.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/fuchsia.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/fuchsia.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/fuchsia.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/fuchsia.jpg (was $MIME)"
    rm -f "nature/republic-ireland/fuchsia.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d0/Fuchsia_magellanica2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/fuchsia.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/fuchsia.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/fuchsia.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/montbretia.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/montbretia.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/montbretia.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/montbretia.jpg (was $MIME)"
    rm -f "nature/republic-ireland/montbretia.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b1/Crocosmia_x_crocosmiiflora.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/montbretia.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/montbretia.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/montbretia.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/early-purple-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/early-purple-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/early-purple-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/early-purple-orchid.jpg (was $MIME)"
    rm -f "nature/republic-ireland/early-purple-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Orchis_mascula_LC0366.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/early-purple-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/early-purple-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/early-purple-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/spring-gentian.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/spring-gentian.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/spring-gentian.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/spring-gentian.jpg (was $MIME)"
    rm -f "nature/republic-ireland/spring-gentian.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8a/Gentiana_verna_Ois%C3%ADs_2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/spring-gentian.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/spring-gentian.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/spring-gentian.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/thrift.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/thrift.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/thrift.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/thrift.jpg (was $MIME)"
    rm -f "nature/republic-ireland/thrift.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Armeria_maritima_Westkueste_Schottland.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/thrift.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/thrift.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/thrift.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/bog-asphodel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/bog-asphodel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/bog-asphodel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/bog-asphodel.jpg (was $MIME)"
    rm -f "nature/republic-ireland/bog-asphodel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/bd/Narthecium_ossifragum_LC0256.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/bog-asphodel.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/bog-asphodel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/bog-asphodel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/tormentil.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/tormentil.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/tormentil.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/tormentil.jpg (was $MIME)"
    rm -f "nature/republic-ireland/tormentil.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Potentilla_erecta_LC0064.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/tormentil.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/tormentil.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/tormentil.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/ragged-robin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/ragged-robin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/ragged-robin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/ragged-robin.jpg (was $MIME)"
    rm -f "nature/republic-ireland/ragged-robin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/1d/Silene_flos-cuculi_LC0044.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/ragged-robin.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/ragged-robin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/ragged-robin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/ivy.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/ivy.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/ivy.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/ivy.jpg (was $MIME)"
    rm -f "nature/republic-ireland/ivy.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Hedera_helix_070103.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/ivy.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/ivy.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/ivy.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/gorse.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/gorse.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/gorse.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/gorse.jpg (was $MIME)"
    rm -f "nature/republic-ireland/gorse.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8f/Ulex_europaeus1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/gorse.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/gorse.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/gorse.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/hawthorn.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/hawthorn.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/hawthorn.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/hawthorn.jpg (was $MIME)"
    rm -f "nature/republic-ireland/hawthorn.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Hawthorn_-_geograph.org.uk_-_1365015.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/hawthorn.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/hawthorn.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/hawthorn.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/sea-campion.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/sea-campion.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/sea-campion.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/sea-campion.jpg (was $MIME)"
    rm -f "nature/republic-ireland/sea-campion.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Silene_uniflora_Worthing.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/sea-campion.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/sea-campion.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/sea-campion.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/primrose.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/primrose.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/primrose.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/primrose.jpg (was $MIME)"
    rm -f "nature/republic-ireland/primrose.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/39/Primula_vulgaris_LC0073.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/primrose.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/primrose.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/primrose.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/yellow-iris.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/yellow-iris.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/yellow-iris.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/yellow-iris.jpg (was $MIME)"
    rm -f "nature/republic-ireland/yellow-iris.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/29/Iris_pseudacorus_-_20060527.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/yellow-iris.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/yellow-iris.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/yellow-iris.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/maidenhair-fern.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/maidenhair-fern.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/maidenhair-fern.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/maidenhair-fern.jpg (was $MIME)"
    rm -f "nature/republic-ireland/maidenhair-fern.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adiantum_capillus-veneris.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/maidenhair-fern.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/maidenhair-fern.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/maidenhair-fern.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/death-cap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/death-cap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/death-cap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/death-cap.jpg (was $MIME)"
    rm -f "nature/republic-ireland/death-cap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Amanita_phalloides_1.JPG"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/death-cap.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/death-cap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/death-cap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/penny-bun.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/penny-bun.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/penny-bun.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/penny-bun.jpg (was $MIME)"
    rm -f "nature/republic-ireland/penny-bun.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Boletus_edulis_IT.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/penny-bun.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/penny-bun.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/penny-bun.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/earthstar.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/earthstar.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/earthstar.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/earthstar.jpg (was $MIME)"
    rm -f "nature/republic-ireland/earthstar.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Geastrum_triplex_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/earthstar.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/earthstar.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/earthstar.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/velvet-shank.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/velvet-shank.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/velvet-shank.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/velvet-shank.jpg (was $MIME)"
    rm -f "nature/republic-ireland/velvet-shank.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Flammulina_velutipes_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/velvet-shank.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/velvet-shank.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/velvet-shank.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/scarlet-elf-cup.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/scarlet-elf-cup.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/scarlet-elf-cup.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/scarlet-elf-cup.jpg (was $MIME)"
    rm -f "nature/republic-ireland/scarlet-elf-cup.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Sarcoscypha_coccinea.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/scarlet-elf-cup.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/scarlet-elf-cup.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/scarlet-elf-cup.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/turkey-tail.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/turkey-tail.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/turkey-tail.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/turkey-tail.jpg (was $MIME)"
    rm -f "nature/republic-ireland/turkey-tail.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c7/Trametes_versicolor_-_Turkey_Tail.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/turkey-tail.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/turkey-tail.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/turkey-tail.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/honey-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/honey-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/honey-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/honey-fungus.jpg (was $MIME)"
    rm -f "nature/republic-ireland/honey-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/74/Armillaria_mellea_2012_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/honey-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/honey-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/honey-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/jelly-ear.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/jelly-ear.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/jelly-ear.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/jelly-ear.jpg (was $MIME)"
    rm -f "nature/republic-ireland/jelly-ear.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Auricularia_auricula-judae_2012_G4.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/jelly-ear.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/jelly-ear.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/jelly-ear.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/shaggy-inkcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/shaggy-inkcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/shaggy-inkcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/shaggy-inkcap.jpg (was $MIME)"
    rm -f "nature/republic-ireland/shaggy-inkcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Coprinus_comatus_2011_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/shaggy-inkcap.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/shaggy-inkcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/shaggy-inkcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/republic-ireland"
if [ -f "nature/republic-ireland/stinkhorn.jpg" ]; then
  MIME=$(file --mime-type -b "nature/republic-ireland/stinkhorn.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/republic-ireland/stinkhorn.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/republic-ireland/stinkhorn.jpg (was $MIME)"
    rm -f "nature/republic-ireland/stinkhorn.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b0/Phallus_impudicus_2011_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/republic-ireland/stinkhorn.jpg"
  echo "[$I/$TOTAL] OK    nature/republic-ireland/stinkhorn.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/republic-ireland/stinkhorn.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/red-kite.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/red-kite.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/red-kite.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/red-kite.jpg (was $MIME)"
    rm -f "nature/wales/red-kite.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Red_Kite_-_Milvus_milvus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/red-kite.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/red-kite.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/red-kite.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/polecat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/polecat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/polecat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/polecat.jpg (was $MIME)"
    rm -f "nature/wales/polecat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Mustela_putorius_-_1700-1880_-_Print_-_Iconographia_Zoologica_-_Special_Collections_University_of_Amsterdam.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/polecat.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/polecat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/polecat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/sea-trout.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/sea-trout.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/sea-trout.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/sea-trout.jpg (was $MIME)"
    rm -f "nature/wales/sea-trout.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Salmo_trutta_Sturm.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/sea-trout.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/sea-trout.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/sea-trout.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/chough.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/chough.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/chough.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/chough.jpg (was $MIME)"
    rm -f "nature/wales/chough.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/59/Pyrrhocorax_pyrrhocorax_-Pembrokeshire%2C_Wales-8.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/chough.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/chough.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/chough.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/horseshoe-bat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/horseshoe-bat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/horseshoe-bat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/horseshoe-bat.jpg (was $MIME)"
    rm -f "nature/wales/horseshoe-bat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Horseshoe_bat.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/horseshoe-bat.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/horseshoe-bat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/horseshoe-bat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/gwyniad.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/gwyniad.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/gwyniad.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/gwyniad.jpg (was $MIME)"
    rm -f "nature/wales/gwyniad.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/39/Gwyniad_fish.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/gwyniad.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/gwyniad.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/gwyniad.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/bottlenose-dolphin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/bottlenose-dolphin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/bottlenose-dolphin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/bottlenose-dolphin.jpg (was $MIME)"
    rm -f "nature/wales/bottlenose-dolphin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Tursiops_truncatus_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/bottlenose-dolphin.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/bottlenose-dolphin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/bottlenose-dolphin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/merlin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/merlin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/merlin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/merlin.jpg (was $MIME)"
    rm -f "nature/wales/merlin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/43/Falco_columbarius_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/merlin.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/merlin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/merlin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/grey-seal.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/grey-seal.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/grey-seal.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/grey-seal.jpg (was $MIME)"
    rm -f "nature/wales/grey-seal.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Grey_seal_%28Halichoerus_grypus%29_2014.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/grey-seal.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/grey-seal.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/grey-seal.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/common-sandpiper.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/common-sandpiper.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/common-sandpiper.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/common-sandpiper.jpg (was $MIME)"
    rm -f "nature/wales/common-sandpiper.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/CommonSandpiper.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/common-sandpiper.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/common-sandpiper.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/common-sandpiper.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/slow-worm.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/slow-worm.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/slow-worm.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/slow-worm.jpg (was $MIME)"
    rm -f "nature/wales/slow-worm.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4f/Anguis_fragilis_2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/slow-worm.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/slow-worm.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/slow-worm.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/harbour-porpoise.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/harbour-porpoise.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/harbour-porpoise.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/harbour-porpoise.jpg (was $MIME)"
    rm -f "nature/wales/harbour-porpoise.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Harbour_porpoise.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/harbour-porpoise.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/harbour-porpoise.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/harbour-porpoise.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/curlew.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/curlew.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/curlew.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/curlew.jpg (was $MIME)"
    rm -f "nature/wales/curlew.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Eurasian_Curlew.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/curlew.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/curlew.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/curlew.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/otter.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/otter.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/otter.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/otter.jpg (was $MIME)"
    rm -f "nature/wales/otter.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Fischotter%2C_Lutra_Lutra.JPG"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/otter.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/otter.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/otter.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/puffin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/puffin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/puffin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/puffin.jpg (was $MIME)"
    rm -f "nature/wales/puffin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Atlantic_puffin_42.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/puffin.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/puffin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/puffin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/snowdon-lily.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/snowdon-lily.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/snowdon-lily.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/snowdon-lily.jpg (was $MIME)"
    rm -f "nature/wales/snowdon-lily.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Lloydia_serotina_flower.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/snowdon-lily.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/snowdon-lily.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/snowdon-lily.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/welsh-poppy.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/welsh-poppy.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/welsh-poppy.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/welsh-poppy.jpg (was $MIME)"
    rm -f "nature/wales/welsh-poppy.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7e/Meconopsis_cambrica.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/welsh-poppy.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/welsh-poppy.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/welsh-poppy.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/grass-of-parnassus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/grass-of-parnassus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/grass-of-parnassus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/grass-of-parnassus.jpg (was $MIME)"
    rm -f "nature/wales/grass-of-parnassus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Parnassia_palustris_LC0083.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/grass-of-parnassus.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/grass-of-parnassus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/grass-of-parnassus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/purple-saxifrage.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/purple-saxifrage.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/purple-saxifrage.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/purple-saxifrage.jpg (was $MIME)"
    rm -f "nature/wales/purple-saxifrage.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/07/Saxifraga_oppositifolia_a1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/purple-saxifrage.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/purple-saxifrage.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/purple-saxifrage.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/bluebell.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/bluebell.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/bluebell.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/bluebell.jpg (was $MIME)"
    rm -f "nature/wales/bluebell.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Bluebell_-_geograph.org.uk_-_1412360.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/bluebell.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/bluebell.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/bluebell.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/sea-campion.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/sea-campion.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/sea-campion.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/sea-campion.jpg (was $MIME)"
    rm -f "nature/wales/sea-campion.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Silene_uniflora_Worthing.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/sea-campion.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/sea-campion.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/sea-campion.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/early-marsh-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/early-marsh-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/early-marsh-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/early-marsh-orchid.jpg (was $MIME)"
    rm -f "nature/wales/early-marsh-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Dactylorhiza_incarnata_%28LC0292%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/early-marsh-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/early-marsh-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/early-marsh-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/cottongrass.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/cottongrass.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/cottongrass.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/cottongrass.jpg (was $MIME)"
    rm -f "nature/wales/cottongrass.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0e/Eriophorum_vaginatum_Torf.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/cottongrass.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/cottongrass.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/cottongrass.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/wood-anemone.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/wood-anemone.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/wood-anemone.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/wood-anemone.jpg (was $MIME)"
    rm -f "nature/wales/wood-anemone.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Anemone_nemorosa_LC0303.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/wood-anemone.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/wood-anemone.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/wood-anemone.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/primrose.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/primrose.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/primrose.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/primrose.jpg (was $MIME)"
    rm -f "nature/wales/primrose.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/39/Primula_vulgaris_LC0073.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/primrose.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/primrose.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/primrose.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/whorled-caraway.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/whorled-caraway.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/whorled-caraway.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/whorled-caraway.jpg (was $MIME)"
    rm -f "nature/wales/whorled-caraway.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/Carum_verticillatum_Oisterwijk.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/whorled-caraway.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/whorled-caraway.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/whorled-caraway.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/heather.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/heather.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/heather.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/heather.jpg (was $MIME)"
    rm -f "nature/wales/heather.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Calluna_vulgaris_-_harilik_kanarbik.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/heather.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/heather.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/heather.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/gorse.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/gorse.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/gorse.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/gorse.jpg (was $MIME)"
    rm -f "nature/wales/gorse.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8f/Ulex_europaeus1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/gorse.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/gorse.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/gorse.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/green-spleenwort.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/green-spleenwort.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/green-spleenwort.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/green-spleenwort.jpg (was $MIME)"
    rm -f "nature/wales/green-spleenwort.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/52/Asplenium_viride_LC0069.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/green-spleenwort.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/green-spleenwort.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/green-spleenwort.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/butterfly-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/butterfly-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/butterfly-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/butterfly-orchid.jpg (was $MIME)"
    rm -f "nature/wales/butterfly-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Platanthera_chlorantha_LC0066.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/butterfly-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/butterfly-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/butterfly-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/chicken-of-woods.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/chicken-of-woods.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/chicken-of-woods.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/chicken-of-woods.jpg (was $MIME)"
    rm -f "nature/wales/chicken-of-woods.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Laetiporus_sulphureus_2015_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/chicken-of-woods.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/chicken-of-woods.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/chicken-of-woods.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/beefsteak-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/beefsteak-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/beefsteak-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/beefsteak-fungus.jpg (was $MIME)"
    rm -f "nature/wales/beefsteak-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Fistulina_hepatica_2010_G5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/beefsteak-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/beefsteak-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/beefsteak-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/dryads-saddle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/dryads-saddle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/dryads-saddle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/dryads-saddle.jpg (was $MIME)"
    rm -f "nature/wales/dryads-saddle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Polyporus_squamosus_2012_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/dryads-saddle.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/dryads-saddle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/dryads-saddle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/earth-tongue.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/earth-tongue.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/earth-tongue.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/earth-tongue.jpg (was $MIME)"
    rm -f "nature/wales/earth-tongue.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Geoglossum_cookeianum_2009_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/earth-tongue.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/earth-tongue.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/earth-tongue.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/giant-funnel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/giant-funnel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/giant-funnel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/giant-funnel.jpg (was $MIME)"
    rm -f "nature/wales/giant-funnel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d8/Leucopaxillus_giganteus_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/giant-funnel.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/giant-funnel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/giant-funnel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/purple-jellydisc.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/purple-jellydisc.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/purple-jellydisc.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/purple-jellydisc.jpg (was $MIME)"
    rm -f "nature/wales/purple-jellydisc.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ascocoryne_sarcoides_2009_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/purple-jellydisc.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/purple-jellydisc.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/purple-jellydisc.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/oak-polypore.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/oak-polypore.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/oak-polypore.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/oak-polypore.jpg (was $MIME)"
    rm -f "nature/wales/oak-polypore.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/2e/Piptoporus_quercinus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/oak-polypore.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/oak-polypore.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/oak-polypore.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/meadow-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/meadow-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/meadow-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/meadow-waxcap.jpg (was $MIME)"
    rm -f "nature/wales/meadow-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cuphophyllus_pratensis_%28Fr.%29_Bon_%281989%29_%2836093671285%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/meadow-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/meadow-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/meadow-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/stinkhorn.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/stinkhorn.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/stinkhorn.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/stinkhorn.jpg (was $MIME)"
    rm -f "nature/wales/stinkhorn.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b0/Phallus_impudicus_2011_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/stinkhorn.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/stinkhorn.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/stinkhorn.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/wales"
if [ -f "nature/wales/scarlet-caterpillarclub.jpg" ]; then
  MIME=$(file --mime-type -b "nature/wales/scarlet-caterpillarclub.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/wales/scarlet-caterpillarclub.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/wales/scarlet-caterpillarclub.jpg (was $MIME)"
    rm -f "nature/wales/scarlet-caterpillarclub.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/60/Cordyceps_militaris_2009_G3.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/wales/scarlet-caterpillarclub.jpg"
  echo "[$I/$TOTAL] OK    nature/wales/scarlet-caterpillarclub.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/wales/scarlet-caterpillarclub.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/red-squirrel.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/red-squirrel.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/red-squirrel.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/red-squirrel.jpg (was $MIME)"
    rm -f "nature/north-england/red-squirrel.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Red_Squirrel_in_St_James%27s_Park%2C_London_-_Nov_2006_edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/red-squirrel.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/red-squirrel.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/red-squirrel.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/golden-plover.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/golden-plover.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/golden-plover.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/golden-plover.jpg (was $MIME)"
    rm -f "nature/north-england/golden-plover.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/38/Pluvialis_apricaria_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/golden-plover.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/golden-plover.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/golden-plover.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/curlew.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/curlew.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/curlew.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/curlew.jpg (was $MIME)"
    rm -f "nature/north-england/curlew.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Eurasian_Curlew.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/curlew.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/curlew.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/curlew.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/short-eared-owl.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/short-eared-owl.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/short-eared-owl.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/short-eared-owl.jpg (was $MIME)"
    rm -f "nature/north-england/short-eared-owl.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Short-eared_Owl_%28Asio_flammeus%29_%2814278511723%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/short-eared-owl.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/short-eared-owl.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/short-eared-owl.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/water-vole.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/water-vole.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/water-vole.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/water-vole.jpg (was $MIME)"
    rm -f "nature/north-england/water-vole.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/92/Water_vole.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/water-vole.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/water-vole.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/water-vole.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/lapwing.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/lapwing.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/lapwing.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/lapwing.jpg (was $MIME)"
    rm -f "nature/north-england/lapwing.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Vanellus_vanellus_in_flight.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/lapwing.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/lapwing.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/lapwing.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/brown-hare.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/brown-hare.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/brown-hare.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/brown-hare.jpg (was $MIME)"
    rm -f "nature/north-england/brown-hare.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/09/Brown_Hare_%28Lepus_europaeus%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/brown-hare.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/brown-hare.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/brown-hare.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/whooper-swan.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/whooper-swan.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/whooper-swan.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/whooper-swan.jpg (was $MIME)"
    rm -f "nature/north-england/whooper-swan.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/94/Whooper_Swans_-_geograph.org.uk_-_1008059.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/whooper-swan.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/whooper-swan.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/whooper-swan.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/adder.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/adder.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/adder.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/adder.jpg (was $MIME)"
    rm -f "nature/north-england/adder.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/Vipera_berus_LC0124.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/adder.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/adder.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/adder.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/pied-flycatcher.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/pied-flycatcher.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/pied-flycatcher.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/pied-flycatcher.jpg (was $MIME)"
    rm -f "nature/north-england/pied-flycatcher.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/45/Ficedula_hypoleuca_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/pied-flycatcher.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/pied-flycatcher.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/pied-flycatcher.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/hen-harrier.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/hen-harrier.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/hen-harrier.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/hen-harrier.jpg (was $MIME)"
    rm -f "nature/north-england/hen-harrier.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Hen_harrier_Circus_cyaneus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/hen-harrier.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/hen-harrier.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/hen-harrier.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/roe-deer.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/roe-deer.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/roe-deer.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/roe-deer.jpg (was $MIME)"
    rm -f "nature/north-england/roe-deer.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b3/Capreolus_capreolus_2_Jojo.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/roe-deer.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/roe-deer.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/roe-deer.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/swift.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/swift.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/swift.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/swift.jpg (was $MIME)"
    rm -f "nature/north-england/swift.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/42/Common_Swift_at_Basildon.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/swift.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/swift.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/swift.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/peregrine.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/peregrine.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/peregrine.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/peregrine.jpg (was $MIME)"
    rm -f "nature/north-england/peregrine.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Falco_peregrinus_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/peregrine.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/peregrine.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/peregrine.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/natterjack-toad.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/natterjack-toad.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/natterjack-toad.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/natterjack-toad.jpg (was $MIME)"
    rm -f "nature/north-england/natterjack-toad.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d5/Epidalea_calamita.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/natterjack-toad.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/natterjack-toad.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/natterjack-toad.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/bird-cherry.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/bird-cherry.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/bird-cherry.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/bird-cherry.jpg (was $MIME)"
    rm -f "nature/north-england/bird-cherry.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/70/Prunus_padus_subsp._padus_Sturm53.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/bird-cherry.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/bird-cherry.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/bird-cherry.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/melancholy-thistle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/melancholy-thistle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/melancholy-thistle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/melancholy-thistle.jpg (was $MIME)"
    rm -f "nature/north-england/melancholy-thistle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/39/Cirsium_heterophyllum_a2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/melancholy-thistle.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/melancholy-thistle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/melancholy-thistle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/mountain-pansy.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/mountain-pansy.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/mountain-pansy.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/mountain-pansy.jpg (was $MIME)"
    rm -f "nature/north-england/mountain-pansy.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/f5/Viola_lutea_LC0067.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/mountain-pansy.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/mountain-pansy.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/mountain-pansy.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/globeflower.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/globeflower.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/globeflower.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/globeflower.jpg (was $MIME)"
    rm -f "nature/north-england/globeflower.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/61/Trollius_europaeus_LC0088.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/globeflower.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/globeflower.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/globeflower.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/spring-sandwort.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/spring-sandwort.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/spring-sandwort.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/spring-sandwort.jpg (was $MIME)"
    rm -f "nature/north-england/spring-sandwort.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/f2/Minuartia_verna_a.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/spring-sandwort.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/spring-sandwort.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/spring-sandwort.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/birds-eye-primrose.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/birds-eye-primrose.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/birds-eye-primrose.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/birds-eye-primrose.jpg (was $MIME)"
    rm -f "nature/north-england/birds-eye-primrose.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Primula_farinosa_LC0168.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/birds-eye-primrose.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/birds-eye-primrose.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/birds-eye-primrose.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/grass-of-parnassus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/grass-of-parnassus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/grass-of-parnassus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/grass-of-parnassus.jpg (was $MIME)"
    rm -f "nature/north-england/grass-of-parnassus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Parnassia_palustris_LC0083.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/grass-of-parnassus.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/grass-of-parnassus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/grass-of-parnassus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/purple-saxifrage.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/purple-saxifrage.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/purple-saxifrage.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/purple-saxifrage.jpg (was $MIME)"
    rm -f "nature/north-england/purple-saxifrage.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/07/Saxifraga_oppositifolia_a1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/purple-saxifrage.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/purple-saxifrage.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/purple-saxifrage.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/sea-lavender.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/sea-lavender.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/sea-lavender.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/sea-lavender.jpg (was $MIME)"
    rm -f "nature/north-england/sea-lavender.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Limonium_vulgare_Biebrza_2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/sea-lavender.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/sea-lavender.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/sea-lavender.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/rowan.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/rowan.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/rowan.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/rowan.jpg (was $MIME)"
    rm -f "nature/north-england/rowan.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/34/Rowan_Sorbus_aucuparia_Beeren.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/rowan.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/rowan.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/rowan.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/heather.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/heather.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/heather.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/heather.jpg (was $MIME)"
    rm -f "nature/north-england/heather.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Calluna_vulgaris_-_harilik_kanarbik.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/heather.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/heather.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/heather.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/great-burnet.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/great-burnet.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/great-burnet.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/great-burnet.jpg (was $MIME)"
    rm -f "nature/north-england/great-burnet.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Sanguisorba_officinalis_LC0174.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/great-burnet.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/great-burnet.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/great-burnet.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/wood-cranesbill.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/wood-cranesbill.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/wood-cranesbill.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/wood-cranesbill.jpg (was $MIME)"
    rm -f "nature/north-england/wood-cranesbill.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/05/Geranium_sylvaticum_LC0237.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/wood-cranesbill.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/wood-cranesbill.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/wood-cranesbill.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/thrift.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/thrift.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/thrift.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/thrift.jpg (was $MIME)"
    rm -f "nature/north-england/thrift.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/82/Armeria_maritima_Westkueste_Schottland.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/thrift.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/thrift.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/thrift.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/cloudberry.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/cloudberry.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/cloudberry.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/cloudberry.jpg (was $MIME)"
    rm -f "nature/north-england/cloudberry.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d8/Rubus_chamaemorus_3.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/cloudberry.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/cloudberry.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/cloudberry.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/velvet-shank.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/velvet-shank.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/velvet-shank.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/velvet-shank.jpg (was $MIME)"
    rm -f "nature/north-england/velvet-shank.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Flammulina_velutipes_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/velvet-shank.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/velvet-shank.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/velvet-shank.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/golden-scalycap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/golden-scalycap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/golden-scalycap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/golden-scalycap.jpg (was $MIME)"
    rm -f "nature/north-england/golden-scalycap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/Pholiota_squarrosa_2009_G3.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/golden-scalycap.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/golden-scalycap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/golden-scalycap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/giant-puffball.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/giant-puffball.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/giant-puffball.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/giant-puffball.jpg (was $MIME)"
    rm -f "nature/north-england/giant-puffball.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/68/Calvatia.gigantea.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/giant-puffball.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/giant-puffball.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/giant-puffball.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/crimson-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/crimson-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/crimson-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/crimson-waxcap.jpg (was $MIME)"
    rm -f "nature/north-england/crimson-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Hygrocybe_punicea.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/crimson-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/crimson-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/crimson-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/fly-agaric.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/fly-agaric.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/fly-agaric.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/fly-agaric.jpg (was $MIME)"
    rm -f "nature/north-england/fly-agaric.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Amanita_muscaria_3_vliegenzwammen_op_rij.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/fly-agaric.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/fly-agaric.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/fly-agaric.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/jelly-ear.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/jelly-ear.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/jelly-ear.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/jelly-ear.jpg (was $MIME)"
    rm -f "nature/north-england/jelly-ear.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Auricularia_auricula-judae_2012_G4.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/jelly-ear.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/jelly-ear.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/jelly-ear.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/birch-polypore.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/birch-polypore.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/birch-polypore.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/birch-polypore.jpg (was $MIME)"
    rm -f "nature/north-england/birch-polypore.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/86/Birch_Polypore_edit.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/birch-polypore.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/birch-polypore.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/birch-polypore.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/chanterelle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/chanterelle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/chanterelle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/chanterelle.jpg (was $MIME)"
    rm -f "nature/north-england/chanterelle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Golden_Chanterelle.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/chanterelle.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/chanterelle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/chanterelle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/sulphur-tuft.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/sulphur-tuft.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/sulphur-tuft.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/sulphur-tuft.jpg (was $MIME)"
    rm -f "nature/north-england/sulphur-tuft.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Hypholoma_fasciculare_2009_G6.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/sulphur-tuft.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/sulphur-tuft.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/sulphur-tuft.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/north-england"
if [ -f "nature/north-england/amethyst-deceiver.jpg" ]; then
  MIME=$(file --mime-type -b "nature/north-england/amethyst-deceiver.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/north-england/amethyst-deceiver.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/north-england/amethyst-deceiver.jpg (was $MIME)"
    rm -f "nature/north-england/amethyst-deceiver.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/2009-10-11_Laccaria_amethystina_%28Huds.%29_Cooke_58993.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/north-england/amethyst-deceiver.jpg"
  echo "[$I/$TOTAL] OK    nature/north-england/amethyst-deceiver.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/north-england/amethyst-deceiver.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/bittern.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/bittern.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/bittern.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/bittern.jpg (was $MIME)"
    rm -f "nature/midlands-east/bittern.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/Eurasian_bittern_%28Botaurus_stellaris%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/bittern.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/bittern.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/bittern.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/marsh-harrier.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/marsh-harrier.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/marsh-harrier.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/marsh-harrier.jpg (was $MIME)"
    rm -f "nature/midlands-east/marsh-harrier.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a1/Circus_aeruginosus_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/marsh-harrier.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/marsh-harrier.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/marsh-harrier.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/crane.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/crane.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/crane.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/crane.jpg (was $MIME)"
    rm -f "nature/midlands-east/crane.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Grus_grus_3_%28Martin_Mecnarowski%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/crane.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/crane.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/crane.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/barn-owl.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/barn-owl.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/barn-owl.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/barn-owl.jpg (was $MIME)"
    rm -f "nature/midlands-east/barn-owl.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/10/Tyto_alba_-British_Wildlife_Centre%2C_Surrey%2C_England-8a_%281%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/barn-owl.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/barn-owl.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/barn-owl.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/fen-raft-spider.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/fen-raft-spider.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/fen-raft-spider.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/fen-raft-spider.jpg (was $MIME)"
    rm -f "nature/midlands-east/fen-raft-spider.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Dolomedes_plantarius.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/fen-raft-spider.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/fen-raft-spider.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/fen-raft-spider.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/red-kite.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/red-kite.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/red-kite.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/red-kite.jpg (was $MIME)"
    rm -f "nature/midlands-east/red-kite.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/67/Red_Kite_-_Milvus_milvus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/red-kite.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/red-kite.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/red-kite.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/white-admiral.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/white-admiral.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/white-admiral.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/white-admiral.jpg (was $MIME)"
    rm -f "nature/midlands-east/white-admiral.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0d/White_admiral_butterfly_%28Limenitis_camilla%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/white-admiral.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/white-admiral.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/white-admiral.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/water-vole.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/water-vole.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/water-vole.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/water-vole.jpg (was $MIME)"
    rm -f "nature/midlands-east/water-vole.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/92/Water_vole.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/water-vole.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/water-vole.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/water-vole.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/brown-long-eared-bat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/brown-long-eared-bat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/brown-long-eared-bat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/brown-long-eared-bat.jpg (was $MIME)"
    rm -f "nature/midlands-east/brown-long-eared-bat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/ff/Plecotus_auritus_-_1700-1880_-_Print_-_Iconographia_Zoologica_-_Special_Collections_University_of_Amsterdam.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/brown-long-eared-bat.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/brown-long-eared-bat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/brown-long-eared-bat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/common-tern.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/common-tern.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/common-tern.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/common-tern.jpg (was $MIME)"
    rm -f "nature/midlands-east/common-tern.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/88/Common_tern_%28Sterna_hirundo%29_in_flight.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/common-tern.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/common-tern.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/common-tern.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/great-crested-newt.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/great-crested-newt.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/great-crested-newt.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/great-crested-newt.jpg (was $MIME)"
    rm -f "nature/midlands-east/great-crested-newt.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Triturus_cristatus_male_Vlasac.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/great-crested-newt.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/great-crested-newt.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/great-crested-newt.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/brown-hare.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/brown-hare.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/brown-hare.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/brown-hare.jpg (was $MIME)"
    rm -f "nature/midlands-east/brown-hare.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/09/Brown_Hare_%28Lepus_europaeus%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/brown-hare.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/brown-hare.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/brown-hare.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/stag-beetle.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/stag-beetle.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/stag-beetle.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/stag-beetle.jpg (was $MIME)"
    rm -f "nature/midlands-east/stag-beetle.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a4/Lucanus_cervus_qtl5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/stag-beetle.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/stag-beetle.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/stag-beetle.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/osprey.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/osprey.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/osprey.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/osprey.jpg (was $MIME)"
    rm -f "nature/midlands-east/osprey.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/80/Osprey_in_flight_%28Andrew_Reding%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/osprey.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/osprey.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/osprey.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/avocet.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/avocet.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/avocet.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/avocet.jpg (was $MIME)"
    rm -f "nature/midlands-east/avocet.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Recurvirostra_avosetta_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/avocet.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/avocet.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/avocet.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/pasque-flower.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/pasque-flower.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/pasque-flower.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/pasque-flower.jpg (was $MIME)"
    rm -f "nature/midlands-east/pasque-flower.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/73/Pulsatilla_vulgaris_LC0019.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/pasque-flower.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/pasque-flower.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/pasque-flower.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/fen-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/fen-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/fen-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/fen-orchid.jpg (was $MIME)"
    rm -f "nature/midlands-east/fen-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8d/Liparis_loeselii.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/fen-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/fen-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/fen-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/yellow-water-lily.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/yellow-water-lily.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/yellow-water-lily.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/yellow-water-lily.jpg (was $MIME)"
    rm -f "nature/midlands-east/yellow-water-lily.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Nuphar_lutea_LC0235.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/yellow-water-lily.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/yellow-water-lily.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/yellow-water-lily.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/greater-spearwort.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/greater-spearwort.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/greater-spearwort.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/greater-spearwort.jpg (was $MIME)"
    rm -f "nature/midlands-east/greater-spearwort.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Ranunculus_lingua_LC0093.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/greater-spearwort.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/greater-spearwort.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/greater-spearwort.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/bluebell.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/bluebell.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/bluebell.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/bluebell.jpg (was $MIME)"
    rm -f "nature/midlands-east/bluebell.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8c/Bluebell_-_geograph.org.uk_-_1412360.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/bluebell.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/bluebell.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/bluebell.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/oxlip.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/oxlip.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/oxlip.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/oxlip.jpg (was $MIME)"
    rm -f "nature/midlands-east/oxlip.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Primula_elatior_LC0183.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/oxlip.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/oxlip.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/oxlip.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/marsh-pea.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/marsh-pea.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/marsh-pea.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/marsh-pea.jpg (was $MIME)"
    rm -f "nature/midlands-east/marsh-pea.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Lathyrus_palustris_LC0290.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/marsh-pea.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/marsh-pea.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/marsh-pea.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/cowslip.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/cowslip.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/cowslip.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/cowslip.jpg (was $MIME)"
    rm -f "nature/midlands-east/cowslip.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/41/Primula_veris_LC0057.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/cowslip.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/cowslip.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/cowslip.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/purple-loosestrife.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/purple-loosestrife.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/purple-loosestrife.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/purple-loosestrife.jpg (was $MIME)"
    rm -f "nature/midlands-east/purple-loosestrife.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b2/Lythrum_salicaria_LC0233.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/purple-loosestrife.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/purple-loosestrife.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/purple-loosestrife.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/bee-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/bee-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/bee-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/bee-orchid.jpg (was $MIME)"
    rm -f "nature/midlands-east/bee-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Ophrys_apifera_-_Malmsbury.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/bee-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/bee-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/bee-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/water-soldier.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/water-soldier.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/water-soldier.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/water-soldier.jpg (was $MIME)"
    rm -f "nature/midlands-east/water-soldier.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/48/Stratiotes_aloides_LC0299.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/water-soldier.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/water-soldier.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/water-soldier.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/common-spotted-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/common-spotted-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/common-spotted-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/common-spotted-orchid.jpg (was $MIME)"
    rm -f "nature/midlands-east/common-spotted-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/f/f6/Dactylorhiza_fuchsii_LC0049.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/common-spotted-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/common-spotted-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/common-spotted-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/ragged-robin.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/ragged-robin.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/ragged-robin.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/ragged-robin.jpg (was $MIME)"
    rm -f "nature/midlands-east/ragged-robin.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/1d/Silene_flos-cuculi_LC0044.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/ragged-robin.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/ragged-robin.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/ragged-robin.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/great-burnet.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/great-burnet.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/great-burnet.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/great-burnet.jpg (was $MIME)"
    rm -f "nature/midlands-east/great-burnet.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Sanguisorba_officinalis_LC0174.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/great-burnet.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/great-burnet.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/great-burnet.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/tussock-sedge.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/tussock-sedge.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/tussock-sedge.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/tussock-sedge.jpg (was $MIME)"
    rm -f "nature/midlands-east/tussock-sedge.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Carex_paniculata_kz2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/tussock-sedge.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/tussock-sedge.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/tussock-sedge.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/oak-milkcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/oak-milkcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/oak-milkcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/oak-milkcap.jpg (was $MIME)"
    rm -f "nature/midlands-east/oak-milkcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Lactarius_quietus_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/oak-milkcap.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/oak-milkcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/oak-milkcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/beech-knight.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/beech-knight.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/beech-knight.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/beech-knight.jpg (was $MIME)"
    rm -f "nature/midlands-east/beech-knight.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/14/Tricholoma_scalpturatum_2012_G5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/beech-knight.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/beech-knight.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/beech-knight.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/penny-bun.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/penny-bun.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/penny-bun.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/penny-bun.jpg (was $MIME)"
    rm -f "nature/midlands-east/penny-bun.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Boletus_edulis_IT.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/penny-bun.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/penny-bun.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/penny-bun.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/parrot-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/parrot-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/parrot-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/parrot-waxcap.jpg (was $MIME)"
    rm -f "nature/midlands-east/parrot-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e1/Gliophorus_psittacinus_2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/parrot-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/parrot-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/parrot-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/earthstar.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/earthstar.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/earthstar.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/earthstar.jpg (was $MIME)"
    rm -f "nature/midlands-east/earthstar.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/84/Geastrum_triplex_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/earthstar.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/earthstar.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/earthstar.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/scarlet-elf-cup.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/scarlet-elf-cup.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/scarlet-elf-cup.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/scarlet-elf-cup.jpg (was $MIME)"
    rm -f "nature/midlands-east/scarlet-elf-cup.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Sarcoscypha_coccinea.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/scarlet-elf-cup.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/scarlet-elf-cup.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/scarlet-elf-cup.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/porcelain-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/porcelain-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/porcelain-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/porcelain-fungus.jpg (was $MIME)"
    rm -f "nature/midlands-east/porcelain-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Porcelain_Fungus_%28Oudemansiella_mucida%29_%281%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/porcelain-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/porcelain-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/porcelain-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/chicken-of-woods.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/chicken-of-woods.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/chicken-of-woods.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/chicken-of-woods.jpg (was $MIME)"
    rm -f "nature/midlands-east/chicken-of-woods.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Laetiporus_sulphureus_2015_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/chicken-of-woods.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/chicken-of-woods.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/chicken-of-woods.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/shaggy-inkcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/shaggy-inkcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/shaggy-inkcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/shaggy-inkcap.jpg (was $MIME)"
    rm -f "nature/midlands-east/shaggy-inkcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Coprinus_comatus_2011_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/shaggy-inkcap.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/shaggy-inkcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/shaggy-inkcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/midlands-east"
if [ -f "nature/midlands-east/hares-ear.jpg" ]; then
  MIME=$(file --mime-type -b "nature/midlands-east/hares-ear.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/midlands-east/hares-ear.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/midlands-east/hares-ear.jpg (was $MIME)"
    rm -f "nature/midlands-east/hares-ear.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/16/Otidea_onotica_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/midlands-east/hares-ear.jpg"
  echo "[$I/$TOTAL] OK    nature/midlands-east/hares-ear.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/midlands-east/hares-ear.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/nightingale.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/nightingale.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/nightingale.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/nightingale.jpg (was $MIME)"
    rm -f "nature/south-england/nightingale.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Luscinia_megarhynchos_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/nightingale.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/nightingale.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/nightingale.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/dormouse.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/dormouse.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/dormouse.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/dormouse.jpg (was $MIME)"
    rm -f "nature/south-england/dormouse.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/8b/Muscardinus_avellanarius_%28cropped%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/dormouse.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/dormouse.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/dormouse.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/adonis-blue.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/adonis-blue.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/adonis-blue.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/adonis-blue.jpg (was $MIME)"
    rm -f "nature/south-england/adonis-blue.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/5f/Polyommatus_bellargus_male_-_Dorset.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/adonis-blue.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/adonis-blue.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/adonis-blue.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/sand-lizard.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/sand-lizard.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/sand-lizard.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/sand-lizard.jpg (was $MIME)"
    rm -f "nature/south-england/sand-lizard.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Lacerta_agilis_male.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/sand-lizard.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/sand-lizard.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/sand-lizard.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/smooth-snake.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/smooth-snake.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/smooth-snake.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/smooth-snake.jpg (was $MIME)"
    rm -f "nature/south-england/smooth-snake.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/2/22/Coronella_austriaca.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/smooth-snake.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/smooth-snake.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/smooth-snake.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/turtle-dove.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/turtle-dove.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/turtle-dove.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/turtle-dove.jpg (was $MIME)"
    rm -f "nature/south-england/turtle-dove.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Streptopelia_turtur_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/turtle-dove.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/turtle-dove.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/turtle-dove.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/smooth-newt.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/smooth-newt.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/smooth-newt.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/smooth-newt.jpg (was $MIME)"
    rm -f "nature/south-england/smooth-newt.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/79/Lissotriton_vulgaris_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/smooth-newt.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/smooth-newt.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/smooth-newt.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/grey-heron.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/grey-heron.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/grey-heron.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/grey-heron.jpg (was $MIME)"
    rm -f "nature/south-england/grey-heron.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/0c/Grey_Heron_%28Ardea_cinerea%29_in_flight_-_Hamina_-_Finland.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/grey-heron.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/grey-heron.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/grey-heron.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/silver-spotted-skipper.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/silver-spotted-skipper.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/silver-spotted-skipper.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/silver-spotted-skipper.jpg (was $MIME)"
    rm -f "nature/south-england/silver-spotted-skipper.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e6/Hesperia_comma_male_-_Dorset.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/silver-spotted-skipper.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/silver-spotted-skipper.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/silver-spotted-skipper.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/roe-deer.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/roe-deer.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/roe-deer.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/roe-deer.jpg (was $MIME)"
    rm -f "nature/south-england/roe-deer.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/b/b3/Capreolus_capreolus_2_Jojo.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/roe-deer.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/roe-deer.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/roe-deer.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/dartford-warbler.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/dartford-warbler.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/dartford-warbler.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/dartford-warbler.jpg (was $MIME)"
    rm -f "nature/south-england/dartford-warbler.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/31/Dartford_Warbler_%28Sylvia_undata%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/dartford-warbler.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/dartford-warbler.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/dartford-warbler.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/white-clawed-crayfish.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/white-clawed-crayfish.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/white-clawed-crayfish.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/white-clawed-crayfish.jpg (was $MIME)"
    rm -f "nature/south-england/white-clawed-crayfish.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/79/Austropotamobius_pallipes.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/white-clawed-crayfish.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/white-clawed-crayfish.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/white-clawed-crayfish.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/hobby.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/hobby.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/hobby.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/hobby.jpg (was $MIME)"
    rm -f "nature/south-england/hobby.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Falco_subbuteo_-_01.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/hobby.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/hobby.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/hobby.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/bechsteins-bat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/bechsteins-bat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/bechsteins-bat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/bechsteins-bat.jpg (was $MIME)"
    rm -f "nature/south-england/bechsteins-bat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e9/Myotis_bechsteinii_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/bechsteins-bat.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/bechsteins-bat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/bechsteins-bat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/spoonbill.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/spoonbill.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/spoonbill.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/spoonbill.jpg (was $MIME)"
    rm -f "nature/south-england/spoonbill.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/8/85/Platalea_leucorodia_Spoonbill_1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/spoonbill.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/spoonbill.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/spoonbill.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/early-spider-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/early-spider-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/early-spider-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/early-spider-orchid.jpg (was $MIME)"
    rm -f "nature/south-england/early-spider-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3b/Ophrys_sphegodes_-_Branscombe.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/early-spider-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/early-spider-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/early-spider-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/wild-gladiolus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/wild-gladiolus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/wild-gladiolus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/wild-gladiolus.jpg (was $MIME)"
    rm -f "nature/south-england/wild-gladiolus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Gladiolus_illyricus.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/wild-gladiolus.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/wild-gladiolus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/wild-gladiolus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/field-cow-wheat.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/field-cow-wheat.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/field-cow-wheat.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/field-cow-wheat.jpg (was $MIME)"
    rm -f "nature/south-england/field-cow-wheat.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/32/Melampyrum_arvense.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/field-cow-wheat.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/field-cow-wheat.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/field-cow-wheat.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/childing-pink.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/childing-pink.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/childing-pink.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/childing-pink.jpg (was $MIME)"
    rm -f "nature/south-england/childing-pink.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Petrorhagia_nanteuilii.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/childing-pink.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/childing-pink.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/childing-pink.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/round-headed-rampion.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/round-headed-rampion.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/round-headed-rampion.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/round-headed-rampion.jpg (was $MIME)"
    rm -f "nature/south-england/round-headed-rampion.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d1/Phyteuma_orbiculare_LC0063.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/round-headed-rampion.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/round-headed-rampion.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/round-headed-rampion.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/man-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/man-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/man-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/man-orchid.jpg (was $MIME)"
    rm -f "nature/south-england/man-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Orchis_anthropophora_LC0126.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/man-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/man-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/man-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/chalk-milkwort.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/chalk-milkwort.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/chalk-milkwort.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/chalk-milkwort.jpg (was $MIME)"
    rm -f "nature/south-england/chalk-milkwort.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Polygala_calcarea_LC0024.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/chalk-milkwort.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/chalk-milkwort.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/chalk-milkwort.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/sea-kale.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/sea-kale.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/sea-kale.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/sea-kale.jpg (was $MIME)"
    rm -f "nature/south-england/sea-kale.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/43/Crambe_maritima_LC0018.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/sea-kale.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/sea-kale.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/sea-kale.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/yellow-horned-poppy.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/yellow-horned-poppy.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/yellow-horned-poppy.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/yellow-horned-poppy.jpg (was $MIME)"
    rm -f "nature/south-england/yellow-horned-poppy.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/37/Glaucium_flavum_LC0083.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/yellow-horned-poppy.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/yellow-horned-poppy.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/yellow-horned-poppy.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/pyramidal-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/pyramidal-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/pyramidal-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/pyramidal-orchid.jpg (was $MIME)"
    rm -f "nature/south-england/pyramidal-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/d3/Anacamptis_pyramidalis_LC0095.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/pyramidal-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/pyramidal-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/pyramidal-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/sea-holly.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/sea-holly.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/sea-holly.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/sea-holly.jpg (was $MIME)"
    rm -f "nature/south-england/sea-holly.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/d/da/Eryngium_maritimum_kz.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/sea-holly.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/sea-holly.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/sea-holly.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/bee-orchid.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/bee-orchid.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/bee-orchid.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/bee-orchid.jpg (was $MIME)"
    rm -f "nature/south-england/bee-orchid.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/1/18/Ophrys_apifera_-_Malmsbury.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/bee-orchid.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/bee-orchid.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/bee-orchid.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/lords-and-ladies.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/lords-and-ladies.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/lords-and-ladies.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/lords-and-ladies.jpg (was $MIME)"
    rm -f "nature/south-england/lords-and-ladies.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/4/4a/Arum_maculatum_LC0113.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/lords-and-ladies.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/lords-and-ladies.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/lords-and-ladies.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/common-rock-rose.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/common-rock-rose.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/common-rock-rose.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/common-rock-rose.jpg (was $MIME)"
    rm -f "nature/south-england/common-rock-rose.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Helianthemum_nummularium_LC0078.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/common-rock-rose.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/common-rock-rose.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/common-rock-rose.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/devils-bit-scabious.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/devils-bit-scabious.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/devils-bit-scabious.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/devils-bit-scabious.jpg (was $MIME)"
    rm -f "nature/south-england/devils-bit-scabious.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Succisa_pratensis_LC0064.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/devils-bit-scabious.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/devils-bit-scabious.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/devils-bit-scabious.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/amethyst-deceiver.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/amethyst-deceiver.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/amethyst-deceiver.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/amethyst-deceiver.jpg (was $MIME)"
    rm -f "nature/south-england/amethyst-deceiver.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/2009-10-11_Laccaria_amethystina_%28Huds.%29_Cooke_58993.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/amethyst-deceiver.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/amethyst-deceiver.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/amethyst-deceiver.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/death-cap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/death-cap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/death-cap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/death-cap.jpg (was $MIME)"
    rm -f "nature/south-england/death-cap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Amanita_phalloides_1.JPG"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/death-cap.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/death-cap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/death-cap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/lurid-bolete.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/lurid-bolete.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/lurid-bolete.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/lurid-bolete.jpg (was $MIME)"
    rm -f "nature/south-england/lurid-bolete.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9a/Suillellus_luridus_2009_G5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/lurid-bolete.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/lurid-bolete.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/lurid-bolete.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/snowy-waxcap.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/snowy-waxcap.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/snowy-waxcap.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/snowy-waxcap.jpg (was $MIME)"
    rm -f "nature/south-england/snowy-waxcap.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/75/Cuphophyllus_virgineus_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/snowy-waxcap.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/snowy-waxcap.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/snowy-waxcap.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/honey-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/honey-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/honey-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/honey-fungus.jpg (was $MIME)"
    rm -f "nature/south-england/honey-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/74/Armillaria_mellea_2012_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/honey-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/honey-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/honey-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/penny-bun.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/penny-bun.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/penny-bun.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/penny-bun.jpg (was $MIME)"
    rm -f "nature/south-england/penny-bun.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Boletus_edulis_IT.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/penny-bun.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/penny-bun.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/penny-bun.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/porcelain-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/porcelain-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/porcelain-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/porcelain-fungus.jpg (was $MIME)"
    rm -f "nature/south-england/porcelain-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/c/c5/Porcelain_Fungus_%28Oudemansiella_mucida%29_%281%29.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/porcelain-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/porcelain-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/porcelain-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/chicken-of-woods.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/chicken-of-woods.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/chicken-of-woods.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/chicken-of-woods.jpg (was $MIME)"
    rm -f "nature/south-england/chicken-of-woods.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/7/7a/Laetiporus_sulphureus_2015_G1.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/chicken-of-woods.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/chicken-of-woods.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/chicken-of-woods.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/yellow-stagshorn.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/yellow-stagshorn.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/yellow-stagshorn.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/yellow-stagshorn.jpg (was $MIME)"
    rm -f "nature/south-england/yellow-stagshorn.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/97/Calocera_viscosa_2009_G2.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/yellow-stagshorn.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/yellow-stagshorn.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/yellow-stagshorn.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

I=$((I+1))
mkdir -p "nature/south-england"
if [ -f "nature/south-england/beefsteak-fungus.jpg" ]; then
  MIME=$(file --mime-type -b "nature/south-england/beefsteak-fungus.jpg")
  if echo "$MIME" | grep -q "image"; then
    echo "[$I/$TOTAL] SKIP  nature/south-england/beefsteak-fungus.jpg"
    SKIP=$((SKIP+1))
    continue
  else
    echo "[$I/$TOTAL] REDOWNLOAD nature/south-england/beefsteak-fungus.jpg (was $MIME)"
    rm -f "nature/south-england/beefsteak-fungus.jpg"
  fi
fi
curl -s -L --max-time 20 \
  -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36" \
  -H "Referer: https://commons.wikimedia.org/" \
  -o "/tmp/wiki_tmp.jpg" \
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Fistulina_hepatica_2010_G5.jpg"
MIME=$(file --mime-type -b /tmp/wiki_tmp.jpg)
if echo "$MIME" | grep -q "image"; then
  mv /tmp/wiki_tmp.jpg "nature/south-england/beefsteak-fungus.jpg"
  echo "[$I/$TOTAL] OK    nature/south-england/beefsteak-fungus.jpg"
  SUCCESS=$((SUCCESS+1))
else
  rm -f /tmp/wiki_tmp.jpg
  echo "[$I/$TOTAL] FAIL  nature/south-england/beefsteak-fungus.jpg (got $MIME)"
  FAIL=$((FAIL+1))
fi
sleep 0.3

echo ""
echo "Done: $SUCCESS downloaded, $SKIP skipped, $FAIL failed"